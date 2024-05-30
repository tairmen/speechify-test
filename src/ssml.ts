/**
 * SSML (Speech Synthesis Markup Language) is a subset of XML specifically
 * designed for controlling synthesis. You can see examples of how the SSML
 * should be parsed in `ssml.test.ts`.
 *
 * DO NOT USE CHATGPT, COPILOT, OR ANY AI CODING ASSISTANTS.
 * Conventional auto-complete and Intellisense are allowed.
 *
 * DO NOT USE ANY PRE-EXISTING XML PARSERS FOR THIS TASK.
 * You may use online references to understand the SSML specification, but DO NOT read
 * online references for implementing an XML/SSML parser.
 */

/** Parses SSML to a SSMLNode, throwing on invalid SSML */
export function parseSSML(ssml: string): SSMLNode {
  // NOTE: Don't forget to run unescapeXMLChars on the SSMLText
  let firstName = ''
  let firstAttrs: SSMLAttribute[] = []
  let tree: SSMLNode[] = []

  for (let i = 0; i < ssml.length; i++) {
    if (ssml[i] == '<') {
      let nameWithAttr: string[] = []
      let tmpStr: string = ''
      let j = i
      while (j < ssml.length || ssml[j] != '>') {
        tmpStr += ssml[j]
      }
      j += 1
      i = j
    }
  }
  if (firstName != 'speak') {
    throw new Error('missing speak tag')
  }
  return {
    name: firstName,
    attributes: firstAttrs,
    children: tree
  }
}

/** Recursively converts SSML node to string and unescapes XML chars */
export function ssmlNodeToText(node: SSMLNode): string {
  return ''
}

// Already done for you
const unescapeXMLChars = (text: string) =>
  text.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&')

type SSMLNode = SSMLTag | SSMLText
type SSMLTag = {
  name: string
  attributes: SSMLAttribute[]
  children: SSMLNode[]
}
type SSMLText = string
type SSMLAttribute = { name: string; value: string }
