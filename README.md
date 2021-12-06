# DevEx Tools Web
Web application for viewing polls list and its data.  
You can not create a poll or vote here

### Run development
 * Install `Node.js` for your OS (if not installed)
 * Install `yarn` (if not installed)

Open `.env` or create `.env.local` file and paste following:
 * `REACT_APP_NETWORK = https://gql.custler.net`
 * `REACT_APP_CONTRACT_CODE = 9b576480fd09539179806cc7b5b43e5589ff62c0ff7880e2b704f851a75cda7d`

Then go to the repository directory and then run following commands
```
yarn install
yarn start
```

If you can not see anything (blank page) and import module error in 
browser dev tools, please, try to replace
`/PROJECT_DIR/public/tonclient.wasm` with
`/PROJECT_DIR/node_modules/@tonclient/lib-web/tonclient.wasm`
