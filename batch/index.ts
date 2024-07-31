import { supabase } from "../src/utils/supabase";

async function cleanupRecords() {
  try {
    console.log("クリーンアップ処理を開始します。");

    const { error } = await supabase.rpc('delete_all_records');

    if (error) {
      console.error("レコードの削除中にエラーが発生しました:", error);
    } else {
      console.log("すべてのレコードが削除されました。");
    }

    console.log("クリーンアップ処理が完了しました。");
  } catch (error) {
    console.error("クリーンアップ処理中にエラーが発生しました:", error);
    process.exit(1);
  }
}

cleanupRecords().catch(error => {
  console.error("予期せぬエラーが発生しました:", error);
  process.exit(1);
});