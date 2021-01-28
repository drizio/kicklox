import { MessageType } from './types';

export function list_to_tree(list: MessageType[]): MessageType[] {
    var map: { [key: number]: number } = {},
      node,
      roots = [],
      i;
  
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
  
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children?.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
}

export function parseMarkdown(markdownText: string) {
    const htmlText = markdownText
        .replace(/\r?\n/g, '<br />')
		.replace(/^### (.*$)/gi, '<h3>$1</h3>')
		.replace(/^## (.*$)/gi, '<h2>$1</h2>')
		.replace(/^# (.*$)/gi, '<h1>$1</h1>')
		.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		.replace(/\*(.*)\*/gim, '<i>$1</i>')
		.replace(/\*(._)\*/gim, '<i>$1</i>')
		.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
		.replace(/\n$/gim, '<br />')

    return htmlText.trim()
}
