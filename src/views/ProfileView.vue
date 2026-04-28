<template>
  <div class="profile-view view-frame profile-page">
    <PageTitle title="PROFILE LEVEL UP" subtitle="学习画像正在升级，资源推荐会跟着你一起进化。" eyebrow="Player Profile" />
    <section class="profile-grid">
      <BrutalCard class="profile-card profile-student-card" color="var(--cyan)" :tilt="-0.7">
        <div class="student-card">
          <div class="avatar">李</div>
          <div class="student-copy">
            <h2>李同学</h2>
            <p class="student-meta">计算机科学与技术 / 大二</p>
            <p class="student-meta">当前课程：人工智能导论</p>
            <span class="sticker">LV.6</span>
          </div>
        </div>
      </BrutalCard>
      <BrutalCard class="profile-card chart-card radar-card" color="var(--white)" :tilt="0.5">
        <h3 class="panel-title">能力雷达图</h3>
        <ProfileRadar />
      </BrutalCard>
      <BrutalCard class="profile-card chart-card growth-card" color="var(--yellow)" :tilt="-0.4">
        <h3 class="panel-title">成长曲线</h3>
        <GrowthChart />
      </BrutalCard>
    </section>

    <section class="profile-bottom-grid">
      <BrutalCard class="profile-card log-card" color="var(--green)" :tilt="0.7">
        <h3 class="panel-title">画像更新日志</h3>
        <ul class="log-list allow-internal-scroll">
          <li v-for="log in profileLogs" :key="log">{{ log }}</li>
        </ul>
      </BrutalCard>
      <BrutalCard class="profile-card weakness-panel" color="var(--orange)" :tilt="-0.8">
        <h3 class="panel-title">薄弱点悬赏榜</h3>
        <div class="weakness-grid">
          <article v-for="point in weakPoints" :key="point" class="weakness-card">
            <span class="soft-tag">BOUNTY</span>
            <strong class="weakness-card-title">{{ point }}</strong>
            <small class="weakness-card-desc">专项补强奖励 +80 XP</small>
            <button type="button">去补强</button>
          </article>
        </div>
      </BrutalCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import GrowthChart from '@/components/profile/GrowthChart.vue';
import ProfileRadar from '@/components/profile/ProfileRadar.vue';
import { profileLogs, weakPoints } from '@/mock/profile';
</script>

<style scoped>
.profile-page {
  display: grid;
  gap: 22px;
  min-width: 0;
  padding-top: 10px;
  padding-bottom: 18px;
}

.profile-page :deep(.page-title) {
  margin-bottom: 18px;
}

.profile-page :deep(.comic-title) {
  line-height: 1;
}

.profile-page :deep(.brutal-card),
.profile-card,
.weakness-card,
.log-list li {
  min-width: 0;
}

.profile-page p,
.profile-page span,
.profile-page h2,
.profile-page h3,
.profile-page strong,
.profile-page small {
  overflow-wrap: anywhere;
}

.profile-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.35fr 1.35fr;
  gap: 24px;
  align-items: stretch;
}

.profile-bottom-grid {
  display: grid;
  grid-template-columns: 0.9fr 2.8fr;
  gap: 24px;
  min-height: 0;
  align-items: stretch;
}

.profile-card {
  display: flex;
  min-height: 0;
  flex-direction: column;
}

.student-card {
  display: flex;
  min-width: 0;
  height: 100%;
  gap: 16px;
  align-items: flex-start;
}

.student-copy {
  min-width: 0;
}

.avatar {
  flex: 0 0 auto;
  display: grid;
  width: 82px;
  height: 82px;
  font-size: 40px;
  font-weight: 1000;
  place-items: center;
  background: var(--yellow);
  border: 4px solid var(--ink);
  border-radius: 50%;
  box-shadow: var(--shadow-small);
}

h2 {
  margin: 0 0 8px;
  font-size: clamp(24px, 2vw, 30px);
  font-weight: 1000;
  line-height: 1.05;
}

p {
  margin: 6px 0;
  font-weight: 900;
}

.student-meta {
  font-size: 15px;
  line-height: 1.38;
}

.profile-student-card {
  justify-content: center;
}

.chart-card {
  min-height: 332px;
}

.radar-card,
.growth-card {
  justify-content: flex-start;
}

.log-list {
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 18px 0 0;
  list-style: none;
  max-height: 220px;
  padding-right: 6px;
  overflow-y: auto;
}

.log-list li {
  padding: 13px;
  font-weight: 1000;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 9px;
  box-shadow: 4px 4px 0 var(--ink);
  line-height: 1.35;
  white-space: normal;
}

.weakness-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.weakness-card {
  display: grid;
  min-height: 120px;
  padding: 16px;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 9px;
  box-shadow: 4px 4px 0 var(--ink);
}

.weakness-card-title,
.weakness-card-desc {
  display: block;
  font-weight: 1000;
  line-height: 1.35;
}

.weakness-card-title {
  margin-top: 10px;
  font-size: 22px;
}

.weakness-card-desc {
  margin-top: 6px;
  font-size: 13px;
}

.weakness-card button {
  justify-self: start;
  min-height: 32px;
  margin-top: 12px;
  padding: 0 12px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--green);
  border: 3px solid var(--ink);
  border-radius: 7px;
  box-shadow: 3px 3px 0 var(--ink);
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.weakness-card button:hover {
  box-shadow: 5px 5px 0 var(--ink);
  transform: translate(-1px, -1px);
}

.weakness-card button:active {
  box-shadow: 1px 1px 0 var(--ink);
  transform: translate(2px, 2px);
}

@media (max-width: 1280px) {
  .profile-grid,
  .profile-bottom-grid {
    gap: 18px;
  }

  .profile-grid {
    grid-template-columns: 1fr 1fr;
  }

  .profile-student-card {
    grid-column: 1 / -1;
  }

  .weakness-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .profile-grid,
  .profile-bottom-grid {
    grid-template-columns: 1fr;
  }

  .profile-page {
    padding-top: 6px;
  }

  .weakness-grid {
    grid-template-columns: 1fr;
  }
}
</style>
