package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.AuctionDetailInfo;
import com.gmtool.util.PageData;

public interface AuctionDetailInfoMapper {
	
	public List<AuctionDetailInfo> findAuctionDetail(PageData pd) throws Exception;
	
	public List<PageData> sumerizeBankType(PageData pd) throws Exception;

}
