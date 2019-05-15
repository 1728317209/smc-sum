const { BigInteger } = require('jsbn');

const mongoose = require('mongoose');
const userServer = require('../service/user');

class SmcController {
  constructor() {
    this.getPubKey = this.getPubKey.bind(this);
    this.getResult = this.getResult.bind(this);
    this.sendResult = this.sendResult.bind(this);
    this.sendPubKey = this.sendPubKey.bind(this);
    this.getEncData = this.getEncData.bind(this);
    this.getPartyNum = this.getPartyNum.bind(this);
    this.clearDatabase = this.clearDatabase.bind(this);
    this.sendEncDataProduct = this.sendEncDataProduct.bind(this);
    this.checkReadyPartyNum = this.checkReadyPartyNum.bind(this);
  }

  async ready(ctx) {
    const user = await userServer.insertUser();
    ctx.body = {
      ret: 1,
      data: user,
    };
  }

  async getPubKey(ctx) {
    const { pubKey } = ctx.request.body;
    this.pubKey = pubKey;
    ctx.body = {
      ret: 1,
    };
  }

  async sendPubKey(ctx) {
    if (this.pubKey) {
      ctx.body = {
        ret: 1,
        pubKey: this.pubKey,
      };
    } else {
      ctx.body = {
        ret: 2,
      };
    }
  }

  async getPartyNum(ctx) {
    const { partyNum } = ctx.request.body;
    this.partyNum = +partyNum;
    ctx.body = {
      ret: 1,
    };
  }

  async getEncData(ctx) {
    let { encData } = ctx.request.body;
    encData = new BigInteger(encData, 16);
    if (this.encData) {
      this.encData.push(encData);
    } else {
      this.encData = [encData];
    }
    ctx.body = {
      ret: 1,
    };
  }

  async sendEncDataProduct(ctx) {
    console.log('this.partyNum', this.partyNum);
    console.log('this.encData.length', this.encData.length);
    if (this.encData.length === this.partyNum) {
      const n2 = new BigInteger(this.pubKey.n2);
      console.log('n2', n2);
      this.encData.forEach((item, idx) => {
        if (idx) {
          this.encDataProduct = this.encDataProduct.multiply(item);
        } else {
          this.encDataProduct = this.encData[0];
        }
      });
      this.encDataProduct = this.encDataProduct.remainder(n2);
      console.log('this.encDataProduct', this.encDataProduct);
      ctx.body = {
        ret: 1,
        encDataProduct: this.encDataProduct.toString(16),
      };
    } else {
      ctx.body = {
        ret: 2,
      };
    }
  }

  async getResult(ctx) {
    const { result } = ctx.request.body;
    this.result = result;
    ctx.body = {
      ret: 1,
    };
  }

  async sendResult(ctx) {
    if (this.result) {
      ctx.body = {
        ret: 1,
        result: this.result,
      };
    } else {
      ctx.body = {
        ret: 2,
      };
    }
  }

  async checkReadyPartyNum(ctx) {
    const readyPartyNum = await userServer.getReadyPartyNum();
    ctx.body = {
      ret: 1,
      data: {
        readyPartyNum,
        partyNum: this.partyNum,
      },
    };
  }

  async clearDatabase(ctx) {
    const User = mongoose.model('User');
    await User.remove((err) => {
      if (err) {
        ctx.body = {
          ret: 2,
        };
      } else {
        this.encDataProduct = null;
        this.partyNum = null;
        this.encData = null;
        this.pubKey = null;
        this.result = null;
        ctx.body = {
          ret: 1,
        };
      }
    });
  }
}

module.exports = new SmcController();
