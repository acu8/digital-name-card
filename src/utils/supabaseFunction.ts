import { User, Skill } from "../domain/user";
import { supabase } from "./supabase";


export const getAllUsers = async (user_id: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id)
      .single();
  
      if (error) {
        if (error.code === 'PGRST116') {
          console.error("Multiple users found with the same user_id. This should not happen:", error);
          throw new Error("データベースの整合性エラー: 同じuser_idを持つ複数のユーザーが見つかりました。");
        } else if (error.code === 'PGRST301') {
          console.log(`No user found with id: ${user_id}`);
          return null;
        } else {
          console.error("Error fetching user:", error);
          throw error;
        }
      }
  
    console.log(`User data:`, data);
    return data;
  };

export const getUserSkills = async (userId: string) => {
    try {
      console.log(userId);
      // まず、ユーザーIDに基づいてuser_skillテーブルからレコードを検索
      const userSkills = await supabase
        .from("user_skill")
        .select("skill_id")
        .eq("user_id", userId)
        .single();
  
      console.log(userSkills);
  
      if (userSkills.error || !userSkills.data) {
        console.error("Failed to get user skills:", userSkills.error);
        return;
      }
  
      const skill = await supabase
        .from("skills")
        .select("*")
        .eq("id", userSkills.data.skill_id)
        .single();
      console.log(skill);
      return skill.data;
    } catch (error) {
      console.error("Failed to get user skills:", error);
    }
  };

  export async function getSkills(): Promise<Skill[]>{
    const response = await supabase.from("skills").select();
    
    if(response.error){
      throw new Error(response.error.message);
  }
  
  const skillsData = response.data.map((data) => {
      return new Skill(data.id, data.name)
  });
  
  return skillsData;
  }
  
export const addUserRecords = async(
    user_id: string,
    name: string,
    description: string,
    github_id?: string,
    qiita_id?: string,
    x_id?: string
  ): Promise<User[]>  => {
    const userData = {
        user_id,
        name,
        description,
        github_id: github_id || null,
        qiita_id: qiita_id || null,
        x_id: x_id || null,
      };
  
    const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();

  if (error) {
    console.error("Error inserting user:", error);
    throw error;
  }

  return data && data.length > 0 ? data[0] : null;
};



  export const addSkill = async (user_id: string, skill_id: string) => {
    if (!user_id || !skill_id) {
        console.error("Invalid user_id or skill_id");
        return;
      }

    try {
      const userSkills = await supabase
        .from("user_skill")
        .insert([{ user_id, skill_id }])
        .select();
  
      if (userSkills.error || !userSkills.data) {
        console.error("Failed to get user skills:", userSkills.error);
        return;
      }
    } catch (error) {
      console.error("Failed to insert user skills:", error);
    }
  };