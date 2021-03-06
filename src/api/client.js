// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, {
  body,
  ...customConfig
} = {}) {
  const headers = {
    'Content-Type': 'application/json'
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ... headers,
      ...customConfig.headers,      
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    console.log("in client req")
    const response = await window.fetch(endpoint, config)
    
    //console.log('in client res')
    // console.log(response)
    data = await response.json()
    //alert(JSON.stringify(data))
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    method: 'GET'
  })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    body
  })
}
client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    method:"PUT",
    body
  })
}
client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    method:"DELETE",
    body
  })
}