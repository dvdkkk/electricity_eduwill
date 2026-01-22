import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-zinc-500 py-12 border-t border-zinc-900 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <h5 className="text-white font-bold mb-4">에듀윌 국비교육원</h5>
                <p className="leading-relaxed mb-4">
                    본 과정은 고용노동부 주관 직업능력개발훈련 과정입니다.<br/>
                    최고의 시설과 강사진으로 여러분의 취업 성공을 끝까지 책임지겠습니다.
                </p>
            </div>
            <div className="md:text-right">
                <p className="font-bold text-zinc-400 mb-2">고객센터</p>
                <p className="text-2xl font-bold text-white">1877-5280</p>
            </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 space-y-2 text-xs md:text-sm">
            <p>상호명 및 호스팅제공자 : ㈜에듀윌 | 대표이사 : 양형남</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                <p>사업자등록번호 : 119-81-54852</p>
                <p>법인등록번호 : 110111-2450031</p>
                <p>통신판매업신고번호 : 구로 제 2008-00077호</p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                <p>원격평생교육시설신고 제 207호</p>
                <p>개인정보보호책임자 : 최성민</p>
            </div>
            <p className="mt-4 text-zinc-600">Copyright ⓒ (주)에듀윌 Corp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};