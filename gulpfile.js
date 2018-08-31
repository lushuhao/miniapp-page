const gulp = require('gulp')
const del = require('del')

const colors = require('ansi-colors')
const log = require('fancy-log')

const exec = require('child_process').exec
const combiner = require('stream-combiner2')
const runSequence = require('run-sequence')
const eslint = require('gulp-eslint')
const gulpIf = require('gulp-if')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const src = './src'
const dist = './lib'

function isFixed(file) {
  return file.eslint && file.eslint.fixed;
}

const handleError = (err) => {
  console.log('\n')
  log(colors.red('Error!'))
  log('fileName: ' + colors.red(err.fileName))
  log('lineNumber: ' + colors.red(err.lineNumber))
  log('message: ' + err.message)
  log('plugin: ' + colors.yellow(err.plugin))
}

gulp.task('js', () => {
  const combined = combiner.obj([
    gulp.src([`${src}/**/*.js`, `!${src}/**`]),
    eslint({fix:true}),
    eslint.format(),
    gulpIf(isFixed, gulp.dest(src)), // 修复后的文件放回原处
    eslint.failAfterError(),

    babel({
      presets: ['@babel/env']
    }),
    uglify({
      compress: true
    }),

    gulp.dest(dist)
  ])

  combined.on('error', handleError)
})

gulp.task('link', (cb) => {
  exec('npm link', (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('watch', ['build'], () => {
  ['js'].forEach(v => {
    gulp.watch(`${src}/**/*.${v}`, [v, 'link'])
  })
})

gulp.task('clean', () => {
  return del([`${dist}/**`])
})

gulp.task('build', ['clean'], () => {
  runSequence('js', 'link')
})
