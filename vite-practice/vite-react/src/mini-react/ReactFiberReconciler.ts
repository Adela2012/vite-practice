import { createFiber } from "./fiber"
import { isStr, updateNode } from "./utils"

export function updateFunctionComponent(wip) {
    const {type, props} = wip
    const children = type(props)
    reconcileChildren(wip, children)
}

export function updateHostComponent(wip) {
    if(!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        updateNode(wip.stateNode, wip.props)
    }

    reconcileChildren(wip, wip.props.children)
    console.log('updateHostComponent', wip);
    
}

export function updateFragmentComponent(wip) {
    console.log(wip)
    reconcileChildren(wip, wip.props.children)
}

function reconcileChildren(returnFiber, children) {
    if (isStr(children)) {
        return
    }

    const newChildren = Array.isArray(children) ? children : [children]

    let previousNewFiber = null

    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        
        if (previousNewFiber == null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

}