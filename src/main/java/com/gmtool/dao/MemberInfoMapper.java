package com.gmtool.dao;

import com.gmtool.entity.Member;
import com.gmtool.entity.SysRole;
import com.gmtool.util.PageData;

import java.util.List;

/**
 * Created by Leon on 2016/12/20.
 */
public interface MemberInfoMapper {

    Member selectByName(PageData pd);

    List<Member> selectAllMember();

    List<Member> selectFreeMember();

    void updateMemberRole(PageData pd);

    boolean updateBasicInfo(PageData pd)  ;

    List<Member> listAllMember(PageData pd)  ;

    public void addMember(PageData pd)  ;

    public void deleteMember(PageData pd)  ;

    SysRole getInterfaces(int i)  ;

}
