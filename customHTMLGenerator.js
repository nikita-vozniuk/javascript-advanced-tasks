// Simple Custom HTML Generator

class HTMLGenerator {
    constructor() {
        this.htmlString = '';
    }

    openTag(tagName, attributes = {}) {
        let attributeString = '';
        if (Object.keys(attributes).length > 0) {
            attributeString = Object.entries(attributes)
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ');
            attributeString = ' ' + attributeString;
        }
        this.htmlString += `<${tagName}${attributeString}>`;
        return this;
    }


    closeTag(tagName) {
        this.htmlString += `</${tagName}>`;
        return this;
    }

    addText(text) {
        this.htmlString += text;
        return this;
    }

    addChild(tagName, attributes = {}, text = '') {
        this.openTag(tagName, attributes).addText(text).closeTag(tagName);
        return this;
    }

    addComment(comment) {
        this.htmlString += `<!-- ${comment} -->`;
        return this;
    }

    addAttributes(attributes = {}) {
        const attributeString = Object.entries(attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        this.htmlString += ` ${attributeString}`;
        return this;
    }

    addClass(className) {
        return this.addAttributes({ class: className });
    }

    addId(idName) {
        return this.addAttributes({ id: idName });
    }

    addStyle(styles) {
        return this.addAttributes({ style: styles });
    }

    createList(items, listType = 'ul', itemTag = 'li', itemAttributes = {}) {
        this.openTag(listType);
        items.forEach(item => {
            this.addChild(itemTag, itemAttributes, item);
        });
        this.closeTag(listType);
        return this;
    }

    generate() {
        return this.htmlString;
    }
}

// Examples of usage

const generator = new HTMLGenerator();

const html = generator
    .openTag('div', { class: 'container' })
    .openTag('h1')
    .addText('HTML Generator Example')
    .closeTag('h1')
    .addChild('p', {}, 'Simple text here')
    .addComment('List:')
    .openTag('ul')
    .addChild('li', {}, 'First Element')
    .addChild('li', {}, 'Second Element')
    .addChild('li', {}, 'Third Element')
    .closeTag('ul')
    .addComment('End of the list')
    .closeTag('div')
    .generate();

const htmlWithId = new HTMLGenerator()
    .openTag('div')
    .addId('container')
    .addText('With id')
    .closeTag('div')
    .generate();

const users = ['Alex', 'Andrew', 'Alice'];

const htmlWithUserList = new HTMLGenerator()
    .createList(users, 'ul', 'li', { class: 'list-item' })
    .generate();

/*
    <div class="container">
        <h1>HTML Generator Example</h1>
        <p>Simple text here</p>
        <!-- List: -->
        <ul>
            <li>First Element</li>
            <li>Second Element</li>
            <li>Third Element</li>
        </ul>
        <!-- End of the list -->
    </div>
*/

/*
    <div> id="container"With id</div>
*/

/*
    <ul>
        <li class="list-item">Alex</li>
        <li class="list-item">Andrew</li>
        <li class="list-item">Alice</li>
    </ul>
*/
