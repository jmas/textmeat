#!/bin/bash

while true; do
	N=`find ./css/ -name "*.less" `;
	inotifywait -qe modify $N;

	for f in $N; do
		lessc $f ${f%.*}.css;
	done;
done
