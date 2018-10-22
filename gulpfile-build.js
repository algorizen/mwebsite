const gulp = require('gulp')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
// 根据 JS CSS 代码产生随机字符串，同时产生一个随机串 JSON
const rev = require('gulp-rev')
// 根据 rev 生成的 rev-manifest.json 文件，去替换 html 的对应内容
const revCollector = require('gulp-rev-collector')
const minifyHTML = require('gulp-minify-html')
const minifyCSS = require('gulp-minify-css')
const gulpSequence = require('gulp-sequence')

// CommonJS规范做JS模块化
gulp.task('packjs', () => {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(webpack({
            // mode: 'development',
            mode: "production",
            entry: {
                app: ['@babel/polyfill', './src/scripts/app.js']
            },
            output: {
                filename: 'app.js'
            },
            module: {
                rules: [{
                        test: /\.html$/,
                        use: ['string-loader']
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/rev/scripts'))
})

// 编译sass
gulp.task('packscss', () => {
    return gulp.src('./src/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/rev/styles'))
})


// copy index.html
gulp.task('copyhtml', () => {
    return gulp.src(['./dist/rev/**/*.json', './src/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(minifyHTML({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest('./dist'));
})

// copy iconfonts
gulp.task('copyicons', () => {
    return gulp.src('./src/iconfonts/**/*')
        .pipe(gulp.dest('./dist/iconfonts'))
})

// copy libs
gulp.task('copylibs', () => {
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./dist/libs'))
})

// copy images
gulp.task('copyimages', () => {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('default', function (cb) {
    gulpSequence(['packscss', 'packjs', 'copyicons', 'copylibs', 'copyimages'], 'copyhtml')(cb)
})