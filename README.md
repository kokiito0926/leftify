## leftify

leftifyは、標準入力から受け取ったテキストのインデントを除去することができるコマンドラインのツールです。  
内部的にdedentライブラリを使用しているので、スマートにインデントを除去することができます。

## インストール

```bash
$ npm install --global @kokiito0926/leftify
```

## 使用方法

なんらかのテキストをパイプで渡して、コマンドを実行します。

```bash
$ cat ./example.txt | leftify
```

## ライセンス

[MIT](LICENSE)
