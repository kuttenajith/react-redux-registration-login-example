import {expect} from 'chai'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fs from 'fs'

import {
  uploadFile,
} from '../../src/actions/UploadActions'

import {
  __RewireAPI__,
  __ResetDependency__,
} from '../../src/actions/NotificationActions'

import {
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS, //eslint-disable-line no-unused-vars
} from '../../src/constants/Upload'

import {
  NOTIFICATION_SHOW,
} from '../../src/constants/Notification'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Upload actions', () => {

  before(() => {
    __RewireAPI__.__Rewire__('v4', () => 'mock-v4-id')
  })

  after(() => {
    __ResetDependency__('v4')
  })

  afterEach(() => {
    nock.cleanAll()
  })

  const response = '{"success":true,"key":"AAAAA","link":"http://192.168.0.140:8081/api/readdata/5xcjxW","expiry":"14 days"}'

  it('creates UPLOAD_FAILURE + NOTIFICATION_SHOW when upload failed', () => {

    const file = fs.readFileSync('./test/actions/sample.md')

    nock('http://192.168.0.140:8081/api/readdata')
      .post('', {'file': file})
      .reply(200, { data: response })

    const expectedActions = [
      { type: UPLOAD_REQUEST },
      { type: UPLOAD_FAILURE },
      { type: NOTIFICATION_SHOW, status: 'err', text: 'Bad request', id: 'mock-v4-id'},
    ]

    const store = mockStore([])

    return store.dispatch(uploadFile(file))
      .then( () => {

        expect(store.getActions()).to.deep.equal(expectedActions)
      } )
  })

})
