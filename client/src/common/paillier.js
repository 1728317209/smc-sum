/* eslint-disable no-bitwise */
import { BigInteger } from 'jsbn'; // jsbn是一个快速、便捷的大整数库，纯JavaScript实现，
import sjcl from 'sjcl'; // 斯坦福JavaScript加密库，是一个由斯坦福大学计算机安全实验室创立的项目，旨在创建一个安全、快速、短小精悍、易使用、跨浏览器的JavaScript加密库

const Paillier = ((() => {
  // 生成大随机数
  const random = (bitLength) => {
    const wordLength = bitLength / 4 / 8;
    const randomWords = sjcl.random.randomWords(wordLength);
    const randomHex = sjcl.codec.hex.fromBits(randomWords);
    return new BigInteger(randomHex, 16);
  };
  // 定义paillier对象
  const paillier = {
  // 生成p、q、n
    generateKeys(keySize) {
      let p;
      let q;
      let n;
      while (true) {
        do {
          p = random(keySize >> 1);
        } while (!p.isProbablePrime(10));

        do {
          q = random(keySize >> 1);
        } while (!q.isProbablePrime(10));

        n = p.multiply(q);
        if (!n.testBit(keySize - 1) || p.compareTo(q) === 0) break;
      }

      const p1 = p.subtract(BigInteger.ONE);
      const q1 = q.subtract(BigInteger.ONE);
      const l = p1.multiply(q1).divide(p1.gcd(q1));

      return new this.Keypair(keySize, n, l);
    },
    // 生成密钥
    Keypair(keySize, n, l) {
      this.pub = new paillier.PublicKey(keySize, n);
      console.log('公钥：', this.pub);
      if (l) this.sec = new paillier.PrivateKey(l, this.pub);
      console.log('私钥', this.sec);
    },
    // 生成公钥
    PublicKey(keySize, n) {
      if (keySize % 2 !== 0) throw new Error('Keysize should be even.');

      this.keySize = keySize;
      this.n = n;
      this.n2 = n.square();
      this.np1 = n.add(BigInteger.ONE);
      this.rnCache = [];
    },
    // 生成私钥
    PrivateKey(lambda, pubKey) {
      this.lambda = lambda;
      console.log('this', this);
      this.pubKey = pubKey;
      const u = pubKey.np1.modPow(this.lambda, pubKey.n2); // u = (n + 1)^this.lambda mod n^2
      this.mu = this.pubKey.L(u).modInverse(pubKey.n);
      if (this.mu.toString() === '0') { throw new Error('Error: n does not divide order of g'); }
    },
  };

  paillier.PublicKey.prototype = {
    encrypt(m) {
      m = this.convertToBn(m);
      const gm = this.n.multiply(m).add(BigInteger.ONE).mod(this.n2);
      const rn = this.generateRn();
      return gm.multiply(rn).mod(this.n2);
    },
    // 其实是求密文的乘积
    add(a, b) {
      return a.multiply(b).remainder(this.n2);
    },
    L(x) {
      return x.subtract(BigInteger.ONE).divide(this.n); // L(x) = (x -1) / n
    },
    generateRn() {
      let r;
      do {
        r = random(this.keySize);
      } while (r.compareTo(this.n) >= 0);
      return r.modPow(this.n, this.n2);
    },
    convertToBn(m) {
      if (typeof m === 'string') {
        m = new BigInteger(m);
      } else if (m.constructor !== BigInteger) {
        m = new BigInteger(parseInt(m, 10).toString());
      }
      return m;
    },
  };

  paillier.PrivateKey.prototype = {
    decrypt(c) {
      const x = this.pubKey.L(c.modPow(this.lambda, this.pubKey.n2)); // bi.modPow(exponent, m) => bi^exponent mod m
      const m = x.multiply(this.mu).mod(this.pubKey.n);
      return m;
    },
  };

  return paillier;
}))();

export default Paillier;
