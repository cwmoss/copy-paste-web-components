files = $(wildcard */*.js)
components = $(shell find . -regex '.*\(/[^/]*\)\1\.js')
components_min = $(patsubst %.js,%.min.js,$(components))

all: $(components_min)

$(components_min): %.min.js: %.js
	echo "min: input $< output $@"
	terser $< -c drop_console=true -m > $@