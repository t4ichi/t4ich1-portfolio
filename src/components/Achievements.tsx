import { Container, Table,} from 'react-bootstrap'
import styles from '../styles/Achievements.module.css'

export const Achievements = () => {
  return (
    
    <Container className={styles.container}>
      <Table striped bordered>
      <thead >
        <tr className={styles.tr}>
          <th>年</th>
          <th>月</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.tr}>
          <td>2019</td>
          <td>2</td>
          <td>第二種電気工事士 取得</td>
        </tr>
        <tr className={styles.tr}>
          <td>2019</td>
          <td>7</td>
          <td>工事担任者 DD3種 取得</td>
        </tr>
        <tr className={styles.tr}>
          <td>2020</td>
          <td>2</td>
          <td>第一種電気工事士 国家試験合格</td>
        </tr>
        <tr className={styles.tr}>
          <td>2020</td>
          <td>5</td>
          <td>普通自動車第一種免許 取得</td>
        </tr>
        <tr className={styles.tr}>
          <td>2022</td>
          <td>8</td>
          <td>
            <a href="https://job.tracks.run/share/gamefreak-all-04/d6a8b35a-2909-4130-bb3c-2cab0076951f"
                className="text-decoration-underline">
                ゲームフリーク プログラミングチャレンジ 
            </a>
            <text>  1位</text>
        </td>
        </tr>
        <tr className={styles.tr}>
          <td>2022</td>
          <td>11</td>
          <td>AppStore 総ダウンロード数2000達成</td>
        </tr>
        <tr className={styles.tr}>
          <td>2023</td>
          <td>1</td>
          <td>
            <a  href="https://job.mynavi.jp/24/pc/corpinfo/displayInternship/index?optNo=As2Gl&corpId=66479"
                className="text-decoration-underline">
                マイナビハッカソン型インターンシップ
            </a> 
            <text>  チームグランプリ取得</text> 
          </td>
        </tr>
      </tbody>
    </Table>
    </Container>
  )
}

export default Achievements