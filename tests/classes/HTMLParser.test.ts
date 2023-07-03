import { HTMLParser } from "../../src/classes/HTMLParser"

describe("HTMLParser", () => {
  test("[success] HTMLParser: create instance", () => {
    const html = `
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE html>
      <html xml:lang="ja" lang="ja">
        <head></head>
        <body>
          <a id="pageBottom" href="#footer">↓</a>
          <div id="novel_header"></div>
          <div id="container">
            <div id="novel_contents">
              <div id="novel_color">
                <p class="novel_title">ここに小説のタイトルが入ってます</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
    const instance = new HTMLParser(html)

    expect(instance).toBeInstanceOf(HTMLParser)
  })

  test("[success] HTMLParser: parseNovelTitle", () => {
    const html = `
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE html>
      <html xml:lang="ja" lang="ja">
        <head></head>
        <body>
          <a id="pageBottom" href="#footer">↓</a>
          <div id="novel_header"></div>
          <div id="container">
            <div id="novel_contents">
              <div id="novel_color">
                <p class="novel_title">ここに小説のタイトルが入ってます</p>
                <div class="novel_writername">
                  作者：<a href="https://mypage.syosetu.com/hoge/">HOGE</a>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
    const instance = new HTMLParser(html)

    expect(instance.parseNovelTitle()).toBe("ここに小説のタイトルが入ってます")
  })
})
