import { createElement } from 'lwc';
import { LOWERCASE_SCOPE_TOKENS } from 'test-utils';
import Container from 'x/container';

// This test only matters for synthetic shadow
describe.skipIf(process.env.NATIVE_SHADOW)('Light DOM and synthetic shadow', () => {
    it('shadow scoping tokens are not set for light DOM components', () => {
        // shadow grandparent, light child, shadow grandchild
        const elm = createElement('x-container', { is: Container });
        document.body.appendChild(elm);

        // shadow grandparent
        expect(elm.shadowRoot.querySelector('h1').outerHTML).toContain(
            LOWERCASE_SCOPE_TOKENS ? 'lwc-7c9hba002d8' : 'x-container_container'
        );
        expect(getComputedStyle(elm.shadowRoot.querySelector('h1')).color).toEqual(
            'rgb(0, 128, 0)'
        );

        // light child
        const child = elm.shadowRoot.querySelector('x-light');
        expect(child.querySelector('h1').outerHTML).not.toContain('x-child_child');
        expect(getComputedStyle(child.querySelector('h1')).backgroundColor).toEqual(
            'rgb(255, 0, 0)'
        );

        // shadow grandchild
        const grandchild = child.querySelector('x-grandchild');
        expect(grandchild.shadowRoot.querySelector('h1').outerHTML).toContain(
            LOWERCASE_SCOPE_TOKENS ? 'lwc-42b236sbaik' : 'x-grandchild_grandchild'
        );
        expect(getComputedStyle(grandchild.shadowRoot.querySelector('h1')).outlineColor).toEqual(
            'rgb(0, 255, 255)'
        );
    });
});
