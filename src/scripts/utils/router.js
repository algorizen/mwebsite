function Router() {
    this.routes = {};
    this.currentHash = '';
}

var noop = function () {}

// 路由组册 绑定
Router.prototype.route = function (hash, cb) {
    this.currentHash = hash;
    this.routes[this.currentHash] = cb || noop;
}

// 路由刷新
Router.prototype.refresh = function () {
    let hash = location.hash.split("?")[0] || '#home'
    this.currentHash = hash;
    this.routes[this.currentHash]();
}

// 路由监听
Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this));
    window.addEventListener('hashchange', this.refresh.bind(this));
}

export default Router