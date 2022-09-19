import { createFiber } from "./fiber"
import { renderHooks } from "./hooks"
import { isStr, isStringOrNumber, Update, updateNode } from "./utils"

export function updateClassComponent(wip) {
    const { type, props } = wip
    const instance = new type(props)
    reconcileChildren(wip, instance.render())
}

export function updateFunctionComponent(wip) {
    renderHooks(wip);
    const { type, props } = wip
    const children = type(props)
    reconcileChildren(wip, children)
}

export function updateHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        updateNode(wip.stateNode, {}, wip.props)
    }

    reconcileChildren(wip, wip.props.children)
    console.log('updateHostComponent', wip);

}

export function updateFragmentComponent(wip) {
    console.log(wip)
    reconcileChildren(wip, wip.props.children)
}

function reconcileChildren(returnFiber, children) {
    if (isStringOrNumber(children)) {
        return;
    }

    const newChildren = Array.isArray(children) ? children : [children]

    let previousNewFiber = null
    let oldFiber = returnFiber.alternate?.child

    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        const same = sameNode(oldFiber, newFiber)

        if (same) {
            Object.assign(newFiber, {
                alternate: oldFiber,
                stateNode: oldFiber.stateNode,
                flags: Update
            })
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }
        if (previousNewFiber == null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

}

function sameNode(a, b) {
    return !!(a && b & a.key == b.key && a.type == b.type)
}