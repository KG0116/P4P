var fs 	   		 = require("fs");
var gulp    	 = require("gulp");
var concat 		 = require("gulp-concat-util");
var uglify 		 = require("gulp-uglify");
var rename 		 = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require("gulp-cssnano");


gulp.task("scripts", function() {
  	var dependencyModel   = fs.readFileSync("./dependency_models/javascripts.json");
  	dependencyModel 	  = JSON.parse(dependencyModel);

  	for(var dependentFile in dependencyModel){
  		gulp.src(dependencyModel[dependentFile])
  		.pipe(concat(dependentFile + ".js"))
  		.pipe(gulp.dest("./public/javascripts/gulp/concat"))
  		.pipe(rename({suffix: ".min"}))
  		.pipe(uglify())
  		.pipe(gulp.dest("./public/javascripts/gulp/minified"));
  	}
});

gulp.task("styles", function(){
	var dependencyModel = fs.readFileSync("./dependency_models/stylesheets.json");
    dependencyModel 	= JSON.parse(dependencyModel);

	for(var dependentFile in dependencyModel){
  		gulp.src(dependencyModel[dependentFile])
  		.pipe(concat(dependentFile + ".css"))
  		.pipe(gulp.dest("./public/stylesheets/gulp/concat"))
  		.pipe(rename({suffix: ".min"}))
  		.pipe(gulp.dest("./public/stylesheets/gulp/minified"));
  	}
});
