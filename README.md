![chode.js logo](chodejs.png)
# Chode.js
A simple, lightweight javascript linter that ensures your files are wider than they are long

### Usage
#### Basic
```
node chode.js
```
#### Optional Arguments
 ```
 -d, --directory
        [file or folder name (defaults to '.')]

 -c, --chodeignore
        [chodeignore file (defaults to './.chodeignore')]
 
 -e, --encoding
        [character encoding (defaults to 'utf-8')]
 
 -v, --verbose
        [for extra file-by-file logging]
 ```

 #### Example
 ```
node chode.js -d ../chodetest -c ../chodetest/chodeignore -e utf-16 -v
 ```