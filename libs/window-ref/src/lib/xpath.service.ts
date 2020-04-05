import { WindowRefService } from './window-ref.service';
import { Injectable } from '@angular/core';
import { WindowRefModule } from './window-ref.module';

@Injectable({
  providedIn: WindowRefModule
})
export class XPathService {
  private document: Document;

  constructor(window: WindowRefService) {
    this.document = window.getDocument();
  }

  getXPath(node: Node): string | null {
    if (node.nodeName === 'HTML' || node.parentNode == null) {
      return '/HTML[1]';
    }

    if (node === document.body) {
      return '/HTML[1]/BODY[1]';
    }

    const siblings = node.parentNode.childNodes;
    let ix = 0;

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];

      if (sibling === node) {
        const parentXPath = this.getXPath(node.parentNode);
        return `${parentXPath}/${node.nodeName}[${ix + 1}]`;
      }

      if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
        ix++;
      }
    }
  }

  getElement<E extends Node>(xpath: string): E {
    return this.document.evaluate(
      xpath,
      this.document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue as E;
  }
}
