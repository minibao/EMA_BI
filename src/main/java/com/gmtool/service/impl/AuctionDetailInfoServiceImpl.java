package com.gmtool.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.AuctionDetailInfoMapper;
import com.gmtool.entity.AuctionDetailInfo;
import com.gmtool.service.IAuctionDetailInfoService;
import com.gmtool.util.PageData;

@Service("auctionDetailInfoService")
public class AuctionDetailInfoServiceImpl implements IAuctionDetailInfoService {
	
	@Autowired
	private AuctionDetailInfoMapper auctionDetailInfoMapper;

	@Override
	public Map findGoldAuctionDetail(PageData pd) {
		// TODO Auto-generated method stub
		
		Map<String,Object> result = new HashMap<String,Object>();
		
		pd.put("itemId", "99");
		pd.put("auctionType", "auctionbankbuy");
		
		List<String> auctionPool = new ArrayList<String>();
		auctionPool.add("auctionbanksell");
		auctionPool.add("auctionbankoff");
		pd.put("auctionPool", auctionPool);
		
		try {
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
			List<AuctionDetailInfo> auctionDetailInfoList = auctionDetailInfoMapper.findAuctionDetail(pd);
			List<PageData> bankTypes = auctionDetailInfoMapper.sumerizeBankType(pd);
			
			result.put("auctions", auctionDetailInfoList);
			
			long buyNum = auctionDetailInfoList.size();
			long sellNum = 0;
			long offNum = 0;
			for (PageData bankType: bankTypes) {
				if ( ((String)bankType.get("acountType")).equals("auctionbanksell") ) {
					sellNum = (Long)bankType.get("count");
				}
				if ( ((String)bankType.get("acountType")).equals("auctionbankoff") ) {
					offNum = (Long)bankType.get("count");
				}
			}
			
	        long totalGold = 0;
	        long totalDiamond = 0;
	        for (AuctionDetailInfo auctionDetailInfo: auctionDetailInfoList)
	        {
	            if ( auctionDetailInfo.getAuctionType().equals("auctionbankbuy") ) {
	                totalGold += auctionDetailInfo.getItemNum();
	                totalDiamond += auctionDetailInfo.getTotalPrice();
                }
	        }
			
			result.put("totalGold", totalGold);
			result.put("totalDiamond", totalDiamond);
			result.put("buyNum", buyNum);
			result.put("sellNum", sellNum);
			result.put("offNum", offNum);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

}
