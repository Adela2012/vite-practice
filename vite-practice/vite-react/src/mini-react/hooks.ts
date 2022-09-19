import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"


let currentlyRenderingFiber = null;
let workInProgressHook = null;


export function useReducer(reducer, initalState) {
    const hook = updateWorkInProgressHook()

    if (!currentlyRenderingFiber.alternate){
        hook.memorizedState = initalState
    }

    const dispatch = (action) => {
        hook.memorizedState = reducer(hook.memorizedState, action)
        scheduleUpdateOnFiber(currentlyRenderingFiber)
    }

    return [hook.memorizedState, dispatch]


}

function updateWorkInProgressHook() {
    let hook = null

    let current = currentlyRenderingFiber.alternate
    if (current) {
        currentlyRenderingFiber.memorizedState = current.memorizedState
        if (workInProgressHook) {
            hook = workInProgressHook = workInProgressHook.next
        } else {
            hook = workInProgressHook = current.memorizedState
        }
    } else {
        hook = {
            memorizedState: null,
            next: null
        }
        if (workInProgressHook) {
            workInProgressHook = workInProgressHook.next = hook
        } else {
            workInProgressHook = currentlyRenderingFiber.memorizedState = hook
        }
    }

    return hook
}

export function renderHooks(fiber) {
    currentlyRenderingFiber = fiber
    currentlyRenderingFiber.memorizedState = null
    workInProgressHook = null
}
