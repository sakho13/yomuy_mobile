import WebView from "react-native-webview"

type Props = {
  // html
  honbun: string
}

const Honbun: React.FC<Props> = ({ honbun }) => {
  const content = `
  <div>
    <style>
      #honbun {
        margin-left: 16px;
        margin-right: 16px;
      }

      #honbun > p {
        font-size: 2.5rem;
      }
    </style>
    <div id="honbun">${honbun}</div>
  </div>
  `

  return (
    <WebView
      source={{
        html: content,
      }}
      style={{}}
    />
  )
}

export default Honbun
