const u = {
    // 参数变成对象
    query2Dict (search) {
        const pattern = /([^?&=]+)=([^&#]*)/g;
        const dict = {};

        search.replace(pattern, (rs, $1, $2) => {
            const key = $1;
            const value = $2;
            dict[key] = value;
        });
        return dict;
    },
    // 对象变成&的参数
    genUrlParams (params = {}) {
        const url = Object.keys(params).filter(key => params[key]).map((key) => {
            const val = params[key];
            let encodeUrl = '';
            if (Object.prototype.toString.call(val).indexOf('String') !== -1) {
                encodeUrl = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
            } else {
                encodeUrl = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`;
            }
            return encodeUrl;
        }).join('&');
        return url;
    },
    // 不在keys中的query变成&字符串
    filterQuery (query, keys) {
        const filterDict = (obj, $keys) => {
            const rs = {};
            Object.keys(obj)
                .filter(key => $keys.indexOf(key) === -1)
                .forEach((key) => {
                    rs[key] = obj[key];
                });
            return rs;
        };
        // eslint-disable-next-line
        const _query = this.query2Dict(query);
        const reduceQuery = filterDict(_query, keys);
        const queryUrl = this.genUrlParams(reduceQuery);
        return queryUrl;
    },
    // 划分url
    getUrlInfo(url = '') {
        const urlInfo = url.split('?');
        const uri = urlInfo[0] || '';
        const search = urlInfo[1] || '';
        const query = this.query2Dict(search);
        return {
            uri,
            query,
        }
    }
};

export default u;
