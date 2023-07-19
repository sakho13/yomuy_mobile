import WebView from "react-native-webview"
import { useSettingsValue } from "../contexts/settingContext"

type Props = {
  // html
  honbun: string
}

const Honbun: React.FC<Props> = ({ honbun }) => {
  const { backgroundColor, textColor } = useSettingsValue()

  const content = `
  <div>
    <style>
      #honbun {
        margin-left: 16px;
        margin-right: 16px;
        color: ${textColor};
      }

      #honbun > p {
        font-size: 2.5rem;
        color: ${textColor};
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
      style={{ backgroundColor }}
    />
  )
}

export default Honbun
