import { WebClient } from '@slack/web-api'


const token = process.env.SLACK_TOKEN
const channel = process.env.SLACK_CHANNEL


const addLog = (payload) => {
    const web = new WebClient(token)
    web.chat.postMessage({
        channel,
        text: '```' + JSON.stringify(payload) + " '```"
    })
}

export { addLog }
