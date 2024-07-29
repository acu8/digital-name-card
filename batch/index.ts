import { supabase } from "../src/utils/supabase";

async function cleanupRecords() {
  try {
    const { error: userSkillError } = await supabase
      .from("user_skill")
      .delete();

    if (userSkillError) {
      console.error("user_skillレコードの削除中にエラーが発生しました:", userSkillError);
    } else {
      console.log("すべてのuser_skillレコードを削除しました。");
    }

    const { error: usersError } = await supabase
      .from("users")
      .delete();

    if (usersError) {
      console.error("usersレコードの削除中にエラーが発生しました:", usersError);
    } else {
      console.log("すべてのusersレコードを削除しました。");
    }

  } catch (error) {
    console.error("クリーンアップ処理中にエラーが発生しました:", error);
  }
}

cleanupRecords();