function htmlEncode (str) {
    return str ? str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2f;') : '';
}

module.exports = async (ctx) => {
    const { id, max } = ctx.request.query;
    // console.log(ctx.request.query)
    // let data = await ctx.redis.get(`danmaku${id}`);
    // 根据视频 id 获取数据库弹幕
    data = await ctx.mongodb.find({ player: id }) || []
    // console.log(data)
    // if (data) {
    //     data = JSON.parse(data);
    //     if (max) {
    //         data = data.slice(-1 * parseInt(max));
    //     }
    //     ctx.response.set('X-Koa-Redis', 'true');
    // } else {
    //     data = await ctx.mongodb.find({ player: id }) || [];
    //     ctx.redis.set(`danmaku${id}`, JSON.stringify(data));
    //     if (max) {
    //         data = data.slice(-1 * parseInt(max));
    //     }
    //     ctx.response.set('X-Koa-Mongodb', 'true');
    // }
    ctx.body = JSON.stringify({
        code: 0,
        danmaku: data.map((item) => [item.time || 0, item.type || 0, item.color || 16777215, htmlEncode(item.author) || 'DPlayer', htmlEncode(item.text) || '']),
    });
};