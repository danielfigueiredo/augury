import {Component, ElementRef, Input} from '@angular/core';
import {NgFor} from '@angular/common';
import {NodeItem} from '../node-item/node-item';

@Component({
  selector: 'component-tree',
  templateUrl: 'src/frontend/components/component-tree/component-tree.html',
  host: {'class': 'flex overflow-scroll'},
  directives: [NgFor, NodeItem]
})
/**
 * Displays the components' hierarchy
 */
export class ComponentTree {
  @Input() tree: any;
  @Input() changedNodes: any;
  @Input() selectedNode: any;
  @Input() closedNodes: Array<any>;
  @Input() allowedComponentTreeDepth: number;

  private prevSelectedNode: Element;

  constructor(
    private el: ElementRef
  ) {}

  scrollToViewIfNeeded(node) {
    const selectedNodeBound = node.getBoundingClientRect();
    const treeViewBound = this.el.nativeElement.getBoundingClientRect();
    const topOffset = selectedNodeBound.top - treeViewBound.top;
    const bottomOffset = selectedNodeBound.bottom - treeViewBound.bottom;
    if (topOffset < 0) {              // node is too high
      this.el.nativeElement.scrollTop += topOffset;
    } else if (bottomOffset > 0) {    // node is too low
      this.el.nativeElement.scrollTop += bottomOffset;
    }
  }

  ngAfterViewChecked() {
    const selectedNode = document.getElementsByClassName('node-item-selected')
                         .item(0);
    if (selectedNode && this.prevSelectedNode !== selectedNode) {
      this.scrollToViewIfNeeded(selectedNode);
      this.prevSelectedNode = selectedNode;
    }
  }

}
