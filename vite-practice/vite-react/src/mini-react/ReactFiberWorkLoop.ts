import { updateFunctionComponent, updateHostComponent, updateFragmentComponent, updateClassComponent } from "./ReactFiberReconciler"
import { scheduleCallback, shouldYield } from "./scheduler"
import { isFn, isStringOrNumber, Placement, Update, updateNode } from "./utils"

let wipRoot = null
let nextUnitOfWork = null



export function scheduleUpdateOnFiber(fiber) {
    fiber.alternate = { ...fiber }
    wipRoot = fiber
    wipRoot.sibling = null
    nextUnitOfWork = wipRoot


    scheduleCallback(workLoop)
}

// requestIdleCallback(workLoop)


function workLoop() {
    while (nextUnitOfWork && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
}

function performUnitOfWork(wip) {
    const { type } = wip
    if (isFn(type)) {
        type.prototype.isReactComponent ? updateClassComponent(wip) : updateFunctionComponent(wip)
    } else if (isStringOrNumber(type)) {
        updateHostComponent(wip)
    } else {
        updateFragmentComponent(wip)
    }

    if (wip.child) {
        return wip.child
    }

    let cur = wip
    while (cur) {
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

    const { flags, stateNode } = fiber
    let parentNode = getParentNode(fiber)

    if (flags && Placement && stateNode) {
        parentNode.appendChild(stateNode)
    }

    if (flags & Update && stateNode) {
        updateNode(stateNode, fiber.alternate.props, fiber.props)
    }

    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}

function getParentNode(fiber) {
    let next = fiber.return
    while (!next.stateNode) {
        next = next.return
    }

    return next.stateNode
}

