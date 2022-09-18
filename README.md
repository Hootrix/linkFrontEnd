# FIRST

![link](https://i.loli.net/2019/09/23/xl4wjFXLp7vHcDB.png)

# DEMO

http://link.hhtjim.com


> A Vue.js project

## Build Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## docker

```

# develop

$ docker run  -it --rm -p 8080:8080 -v $(pwd)/linkFrontEnd/:/data/ registry.cn-chengdu.aliyuncs.com/hhtjim/link-front-end sh -c 'cd /data;npm install --save-dev;npm run serve'


# build

$ docker run  -it --rm -v $(pwd)/linkFrontEnd/:/data/ registry.cn-chengdu.aliyuncs.com/hhtjim/link-front-end sh -c 'cd /data;npm install --save-dev;npm run build'
```

## License


```
The MIT License (MIT)

Copyright (c) 2016 Panc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 感谢开源社区
bootstrap Vue ...