# Slack Signup API

## Setup
### Run MongoDB in another terminal tab
```bash
$ mongod
```

### Try it out
```bash
$ open example/index.html
$ SLACK_TOKEN=myslacktoken make
```

### Customize ALLOW_ORIGIN Environment Variable
```bash
$ ALLOW_ORIGIN=mywebsite.com SLACK_TOKEN=myslacktoken make server
```

## Tests
```bash
$ make tests
```
