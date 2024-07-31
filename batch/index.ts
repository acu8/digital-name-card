import { supabase } from "../src/utils/supabase";

async function cleanupRecords() {
  try {
    console.log("クリーンアップ処理を開始します。");

    const { data: userSkillData, error: userSkillError } = await supabase
      .from("user_skill")
      .delete()
      .select();

    if (userSkillError) {
      console.error("user_skillレコードの削除中にエラーが発生しました:", userSkillError);
    } else {
      console.log(`${userSkillData.length}件のuser_skillレコードを削除しました。`);
    }

    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .delete()
      .select();

    if (usersError) {
      console.error("usersレコードの削除中にエラーが発生しました:", usersError);
    } else {
      console.log(`${usersData.length}件のusersレコードを削除しました。`);
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