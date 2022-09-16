import { updateFunctionComponent, updateHostComponent, updateFragmentComponent } from "./ReactFiberReconciler"
import { isFn, isStr } from "./utils"

let wipRoot = null
let nextUnitOfWork = null



export function scheduleUpdateOnFiber(fiber) {
    wipRoot = fiber
    wipRoot.sibling = null
    nextUnitOfWork = wipRoot

}

requestIdleCallback(workLoop)


function workLoop(IdleDeadLine) {
    while(nextUnitOfWork && IdleDeadLine.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
}

function performUnitOfWork(wip) {
    const {type} = wip
    if (isFn(type)) {
        updateFunctionComponent(wip)
    } else if (isStr(type)) {
        updateHostComponent(wip)
    } else {
        updateFragmentComponent(wip)
    }

    if (wip.child) {
        return wip.child
    }

    let cur = wip
    while(cur) {
        if (cur.sibling) {
            return cur.sibling
        }
        cur = cur.return
    }
    return null
}




function commitRoot() {
    commitWorker(wipRoot.child);
}

function commitWorker(fiber) {
    if (!fiber) return

    const {stateNode} = fiber
    let parentNode = getParentNode(fiber)

    if (stateNode) parentNode.appendChild(stateNode)

    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}

function getParentNode(fiber) {
    let next = fiber.return
    while(!next.stateNode) {
        next = next.return
    }

    return next.stateNode
}
