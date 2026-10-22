# 幕間・台灣音樂劇日曆

台灣音樂劇日曆的靜態網站程式碼、公開演出資料與來源查核文件。

網站：https://musical.ben2.win

## 本機預覽

執行 `python3 -m http.server 8000 --directory dist`，再開啟 http://localhost:8000 。不需要安裝前端套件或編譯。

## 功能與資料

- 互動月曆，依城市、地區與關鍵字篩選。
- 演出形式分別標註，包括音樂劇、親子音樂劇、讀劇音樂會與成人 Show Musical。
- 售票、開賣與早鳥資訊，保留未知事項及官方來源；不提供即時餘票保證。
- 雙北場館與創作團隊選集。

2026-10-22 查核版本涵蓋 2026-10-22 至 2027-01-21，收錄 26 部作品、151 場演出、8 個場館及 7 個團隊。這不是全臺完整節目表；購票前請依官方最新公告確認。

## 檔案與測試

網站位於 `dist/`，主要資料是 `events.js`、`ticket-data.js`、`guides-data.js`。執行：

- `node tests.cjs`
- `node guides-tests.cjs`
- `node ticket-tests.cjs`

[資料整理與更新原則](docs/maintenance.md) · [公開資料來源與蒐集規則](docs/sources.md)

僅在資料或功能有實質變更時發佈與備份。此儲存庫不包含憑證或部署身分設定；推送到 GitHub 不會自行部署網站。
