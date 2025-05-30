/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isUndefined } from '@lwc/shared';

import { getComponentStack } from './format';
import type { VM } from '../framework/vm';

const alreadyLoggedMessages = new Set();

// Only used in LWC's Karma tests
if (process.env.NODE_ENV === 'test-karma-lwc') {
    (window as any).__lwcResetAlreadyLoggedMessages = () => {
        alreadyLoggedMessages.clear();
    };
}

function log(method: 'warn' | 'error', message: string, vm: VM | undefined, once: boolean) {
    let msg = `[LWC ${method}]: ${message}`;

    if (!isUndefined(vm)) {
        msg = `${msg}\n${getComponentStack(vm)}`;
    }

    if (once) {
        if (alreadyLoggedMessages.has(msg)) {
            return;
        }
        alreadyLoggedMessages.add(msg);
    }

    // In Vitest tests, reduce the warning and error verbosity by not printing the callstack
    if (process.env.NODE_ENV === 'test') {
        /* eslint-disable-next-line no-console */
        console[method](msg);
        return;
    }

    try {
        throw new Error(msg);
    } catch (e) {
        /* eslint-disable-next-line no-console */
        console[method](e);
    }
}

export function logError(message: string, vm?: VM) {
    log('error', message, vm, false);
}

export function logErrorOnce(message: string, vm?: VM) {
    log('error', message, vm, true);
}

export function logWarn(message: string, vm?: VM) {
    log('warn', message, vm, false);
}

export function logWarnOnce(message: string, vm?: VM) {
    log('warn', message, vm, true);
}
