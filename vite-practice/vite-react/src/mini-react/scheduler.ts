const taskQueue = []
const timerQueue = []

let deadline = 0


const threshold = 5

export function scheduleCallback(callback) {
    const newTask = {callback}
    taskQueue.push(newTask)
    schedule(flushWork)
}

function schedule (callback) {
    timerQueue.push(callback)
    postMessage()
}

function postMessage() {
    const {port1, port2} = new MessageChannel()
    port1.onmessage = () => {
        let tem = timerQueue.splice(0, timerQueue.length)
        tem.forEach(c => c())
    }
    port2.postMessage(null)
}

function flushWork () {
    deadline = getCurrentTime() + threshold
    let currentTask = taskQueue[0]
    while(currentTask && !shouldYield()) {
        const {callback} = currentTask
        callback()
        taskQueue.shift()
        currentTask = taskQueue[0]
    }
}

export function getCurrentTime() {
    return performance.now()
}

export function shouldYield () {
    return getCurrentTime() >= deadline
}