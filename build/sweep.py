import os

FILES = "\
	../src/js-dev/sweep.js\
	../src/js-dev/SVG.js\
	../src/js-dev/Gui.js\
	../src/js-dev/Button.js\
	../src/js-dev/Info.js\
	../src/js-dev/Input.js\
	../src/js-dev/Sweepline.js\
	../src/js-dev/Point.js\
	../src/js-dev/Line.js"

#LEVEL = "WHITESPACE_ONLY"
LEVEL = "SIMPLE_OPTIMIZATIONS"

os.system("java -jar compiler.jar --js %s --js_output_file ../src/js/sweep.js --compilation_level %s" % (FILES, LEVEL))

