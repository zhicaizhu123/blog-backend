const path = require("path");
const fs = require("fs");

class CommonCtl {
  // 用户登录
  async upload(ctx) {
    const { file } = ctx.request.files;
    const { dir = "material" } = ctx.request.body;
    const basename = path.basename(file.path);
    const reader = fs.createReadStream(file.path);
    const dirPath = path.join(__dirname, `../public/upload/${dir}`);
    const filePath = `${dirPath}/${basename}`;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.success({
      data: { url: `${ctx.origin}/upload/${dir}/${basename}` },
      msg: "上传成功"
    });
  }
}

module.exports = new CommonCtl();
