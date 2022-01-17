
SRC = $(wildcard *.inscore)
TXT = $(SRC:%=%.txt)

all: $(TXT)

%.inscore.txt: %.inscore
	cp $< $@