timestamp() {
  date +%s 
}

touch ./.version
timestamp > .version

value=$(<./.version)
sed -e '3s/.*/  "version": "0.'$value'.0",/' -i '' ./../package.json 