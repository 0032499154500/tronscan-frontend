import React, { Component } from "react";
import { Form, Input, Button, Radio,Slider } from "antd";
import { QuestionMark } from "../../../../common/QuestionMark";
import { withRouter } from "react-router";
import { Client, Client20 } from "../../../../../services/api";
import SweetAlert from "react-bootstrap-sweetalert";
import { tu } from "../../../../../utils/i18n";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { ONE_TRX } from "../../../../../constants";
import { find } from "lodash";

import NumericInput from "./NumericInput";

const FormItem = Form.Item;
const marks = {
    0: "",
    25: "",
    50: "",
    75: "",
    100: ""
  };
  
  function formatter(value) {
    return `${value}%`;
  }
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      firstBalance: {},
      secondBalance: {},
      trs_proportion: 0,
      buy_amount: 0,
      buy_money: 0,
      sell_amount: 0,
      sell_money: 0
    };
  }

  

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const {
      selectStatus,
      currentWallet,
      exchangeData,
      activeLanguage
    } = this.props;
    if (
      prevProps.currentWallet != currentWallet ||
      prevProps.exchangeData != exchangeData ||
      prevProps.activeLanguage != activeLanguage
    ) {
      if (currentWallet != null) {
        const first = find(currentWallet.tokenBalances, function(o) {
          return exchangeData.first_token_id === o.name;
        }) || { balance: 0, name: exchangeData.first_token_id };
        const second = find(currentWallet.tokenBalances, function(o) {
          return exchangeData.second_token_id === o.name;
        }) || { balance: 0, name: exchangeData.second_token_id };
        this.setState({ firstBalance: first, secondBalance: second });
      } else {
        this.setState({ firstBalance: {}, secondBalance: {} });
      }
    }
    if (prevProps.exchangeData.exchange_id != exchangeData.exchange_id) {
      this.props.form.resetFields();
    }
  }

  handleSubmitBuy = e => {
    let { account, currentWallet, exchangeData } = this.props;
    e.preventDefault();

    this.props.form.validateFields(
      ["first_quant_buy", "second_quant_buy"],
      (err, values) => {
        if (!err) {
          let token_id =
            exchangeData.second_token_id == "TRX"
              ? "_"
              : exchangeData.second_token_id;
          let quant =
            exchangeData.second_token_id == "TRX"
              ? values.second_quant_buy * ONE_TRX
              : values.second_quant_buy;
          let expected =
            exchangeData.first_token_id == "TRX"
              ? values.first_quant_buy * ONE_TRX
              : values.first_quant_buy;

          this.exchangeTransaction(
            exchangeData.exchange_id,
            token_id,
            quant,
            expected,
            values
          );
        }
      }
    );
  };

  handleSubmitSell = e => {
    let { account, currentWallet, exchangeData } = this.props;
    e.preventDefault();
    this.props.form.validateFields(
      ["first_quant_sell", "second_quant_sell"],
      (err, values) => {
        if (!err) {
          let token_id =
            exchangeData.first_token_id == "TRX"
              ? "_"
              : exchangeData.first_token_id;
          let quant =
            exchangeData.first_token_id == "TRX"
              ? parseFloat(values.first_quant_sell) * ONE_TRX
              : parseFloat(values.first_quant_sell);
          let expected =
            exchangeData.second_token_id == "TRX"
              ? values.second_quant_sell * ONE_TRX
              : values.second_quant_sell;

          this.exchangeTransaction(
            exchangeData.exchange_id,
            token_id,
            quant,
            expected,
            values
          );
        }
      }
    );
  };

  exchangeTransaction = async (
    exchangeId,
    tokenId,
    quant,
    expected,
    values
  ) => {
    let { account, currentWallet, exchangeData, intl } = this.props;
    let {
      success,
      code,
      transaction,
      message
    } = await Client.transactionExchange(
      currentWallet.address,
      exchangeId,
      tokenId,
      quant,
      expected
    )(account.key);
    if (success) {
      this.props.form.resetFields();
      this.setState({
        modal: (
          <SweetAlert
            success
            title={tu("transaction_success")}
            onConfirm={this.hideModal}
          >
            {tu("transaction_success_message")}
          </SweetAlert>
        )
      });
      await Client.exchange({
        creatorAddress: currentWallet.address,
        trx_hash: transaction.hash,
        exchangeID: exchangeData.exchange_id,
        first_token_id: exchangeData.first_token_id,
        first_token_quant: values.first_quant_buy
          ? parseFloat(values.first_quant_buy)
          : parseFloat(values.first_quant_sell),
        second_token_id: exchangeData.second_token_id,
        second_token_quant: values.second_quant_buy
          ? parseFloat(values.second_quant_buy)
          : parseFloat(values.second_quant_sell),
        price: exchangeData.price
      });
    } else {
      this.setState({
        modal: (
          <SweetAlert
            danger
            title={tu("transaction_error")}
            onConfirm={this.hideModal}
          >
            {tu("transaction_error_message")}
            <br />
            <i className="fas fa-book-open" />
            <a
              href={
                intl.locale == "zh"
                  ? "https://coin.top/production/js/20181130053419.pdf"
                  : "https://coin.top/production/js/20181130053308.pdf"
              }
              target="_blank"
              style={{ marginLeft: 5 }}
            >
              {tu("How_to_trade_on_DEX")}
            </a>
          </SweetAlert>
        )
      });
    }
  };

  getCalcCount = async (count, name, id) => {
    if (!count) return 0;
    const data = await Client.getExchangeCalc({
      sell: count,
      sellID: name,
      exchangeID: id
    });
    return data.buyTokenQuant;
  };

  hideModal = () => {
    this.setState({ modal: null });
  };
  handleSecondValueBuy = async value => {
    let { exchangeData } = this.props;
    this.props.form.setFieldsValue({
      second_quant_buy:
        exchangeData.second_token_id == "TRX"
          ? parseFloat(value * 1.01 * exchangeData.price).toFixed(6)
          : value * exchangeData.price * 1.01
    });
  };

  handleSecondValueSell = async value => {
    let { exchangeData } = this.props;
    this.props.form.setFieldsValue({
      second_quant_sell:
        exchangeData.second_token_id == "TRX"
          ? parseFloat(value * 0.99 * exchangeData.price).toFixed(6)
          : value * exchangeData.price * 0.99
    });
  };

  slideChangebuy (value) {
    clearTimeout(this.time)
    this.time = setTimeout(() => {
        const {secondBalance} = this.state
        const {exchangeData} = this.props
        const buyMoney = parseInt(secondBalance.balance * value / 100)

        Client20.getExchangeCalc({
            exchangeID: exchangeData.exchange_id,
            sell: buyMoney,
            sellID: exchangeData.second_token_id
        }).then(({buyTokenQuant}) => {
            this.props.form.setFieldsValue({
                second_quant_buy:buyMoney,
                first_quant_buy: buyTokenQuant
            })
        })
    },500)
  }

  slideChangesell = (value) => {
    clearTimeout(this.time)
    this.time = setTimeout(() => {
        const {firstBalance} = this.state
        const {exchangeData} = this.props
        const sellMoney = parseInt(firstBalance.balance * value / 100)

        Client20.getExchangeCalc({
            exchangeID: exchangeData.exchange_id,
            sell: sellMoney,
            sellID: exchangeData.first_token_id
        }).then(({buyTokenQuant}) => {
            this.props.form.setFieldsValue({
                second_quant_sell:buyTokenQuant,
                first_quant_sell: sellMoney
            })
        })
    },500)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { exchangeData, account, currentWallet, intl } = this.props;
    let { modal, firstBalance, secondBalance,trs_proportion } = this.state;
    return (
      <div className="exchange__transaction d-flex">
        {modal}
        {/* 买入模块 */}
        <div className="exchange__transaction__item mr-2 p-3">
          <h5 className="mr-3">
            {exchangeData.exchange_name} ≈{" "}
            {exchangeData.price && (
              <span>{Number(exchangeData.price).toFixed(6)}</span>
            )}
            {/* { (secondBalance&& secondBalance.name)&&<span className=" text-sm d-block">{tu("TxAvailable")} {secondBalance.balance+' '+secondBalance.name}</span>} */}
          </h5>
          <hr />
          <Form layout="vertical" onSubmit={this.handleSubmitBuy}>
            <FormItem>
              {getFieldDecorator("first_quant_buy", {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "enter_the_trading_amount"
                    })
                  }
                ]
              })(
                <NumericInput
                  addonBefore={intl.formatMessage({
                    id: "BUY"
                  })}
                  addonAfter={exchangeData.first_token_id}
                  placeholder={intl.formatMessage({
                    id: "enter_the_trading_amount"
                  })}
                  size="large"
                  type="text"
                  onChange={this.handleSecondValueBuy}
                />
              )}
            </FormItem>

            {/* <FormItem
              label={
                <span>
                  {tu("estimated_cost")}{" "}
                  <span className="tx-question-mark">
                    <QuestionMark text="slightly_cost" />
                  </span>
                </span>
              }
            > */}
            <FormItem>
              {getFieldDecorator("second_quant_buy", {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "enter_the_trading_amount"
                    })
                  }
                ]
              })(
                <NumericInput
                  addonBefore={intl.formatMessage({
                    id: "estimated_cost"
                  })}
                  addonAfter={exchangeData.second_token_id}
                  placeholder={intl.formatMessage({
                    id: "enter_the_trading_amount"
                  })}
                  size="large"
                  type="text"
                />
              )}
            </FormItem>
            <div className="mb-3">
                { (secondBalance&& secondBalance.name)&&<span className=" text-sm d-block">{tu("TxAvailable")} {secondBalance.balance+' '+secondBalance.name}</span>} 
            </div>
            <div className="mb-3">
            <Slider
              marks={marks}
            //   value={trs_proportion}
              defaultValue={0}
              tipFormatter={formatter}
              onChange={(value) => this.slideChangebuy(value)}
            />
          </div>

            <FormItem>
              <Button
                type="primary"
                className="success"
                size="large"
                htmlType="submit"
                disabled={!account.address}
              >
                {tu("BUY")} {exchangeData.first_token_id}
              </Button>
            </FormItem>
          </Form>
        </div>

        {/* 卖出模块 */}
        <div className="exchange__transaction__item  p-3">
          <h5 className="mr-3">
            {exchangeData.exchange_name} ≈{" "}
            {exchangeData.price && (
              <span>{Number(exchangeData.price).toFixed(6)}</span>
            )}
            {/* {firstBalance && firstBalance.name && (
              <span className="text-sm d-block">
                {tu("TxAvailable")}{" "}
                {firstBalance.balance + " " + firstBalance.name}
              </span>
            )} */}
          </h5>
          <hr />
          <Form layout="vertical" onSubmit={this.handleSubmitSell}>
            <FormItem>
              {getFieldDecorator("first_quant_sell", {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "enter_the_trading_amount"
                    })
                  }
                ]
              })(
                <NumericInput
                  addonBefore={intl.formatMessage({
                    id: "SELL"
                  })}
                  addonAfter={exchangeData.first_token_id}
                  placeholder={intl.formatMessage({
                    id: "enter_the_trading_amount"
                  })}
                  size="large"
                  type="text"
                  onChange={this.handleSecondValueSell}
                />
              )}
            </FormItem>
            {/* <FormItem
              label={
                <span>
                  {tu("estimated_revenue")}
                  <span className="tx-question-mark">
                    <QuestionMark text="slightly_revenue" />
                  </span>
                </span>
              }
            > */}
            <FormItem>
              {getFieldDecorator("second_quant_sell", {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "enter_the_trading_amount"
                    })
                  }
                ]
              })(
                <NumericInput
                  addonBefore={intl.formatMessage({
                    id: "estimated_revenue"
                  })}
                  addonAfter={exchangeData.second_token_id}
                  placeholder={intl.formatMessage({
                    id: "enter_the_trading_amount"
                  })}
                  size="large"
                  type="text"
                />
              )}
            </FormItem>
            <div className="mb-3">
            {firstBalance && firstBalance.name && (
                <span className="text-sm d-block">
                {tu("TxAvailable")}{" "}
                {firstBalance.balance + " " + firstBalance.name}
                </span>
            )}             
            </div>
            <div className="mb-3">
            <Slider
              marks={marks}
              defaultValue={0}
              tipFormatter={formatter}
              onChange={this.slideChangesell}
            />
          </div>
            <FormItem>
              <Button
                type="primary"
                className="warning"
                size="large"
                htmlType="submit"
                disabled={!account.address}
              >
                {tu("SELL")} {exchangeData.first_token_id}
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    exchangeData: state.exchange.data,
    selectStatus: state.exchange.status,
    account: state.app.account,
    currentWallet: state.wallet.current,
    activeLanguage: state.app.activeLanguage
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Form.create()(withRouter(Transaction))));