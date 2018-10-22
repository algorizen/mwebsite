import mallTpl from '../views/mall.html'

const render = () => {
    $("nav .title").text("商城")
    $('main').html(mallTpl);
}

export default {
    render
}