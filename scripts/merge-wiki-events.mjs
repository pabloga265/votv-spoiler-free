import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'index.html');
const html = readFileSync(htmlPath, 'utf8');
const match = html.match(/<script id="event-data" type="application\/json">\s*([\s\S]*?)\s*<\/script>/);
if (!match) throw new Error('event-data block not found');
const data = JSON.parse(match[1]);

const newCategories = [
  {
    id: 'story-mode',
    label: 'Story Mode',
    description: 'Welcome to the Array. Fixed-day events on every Story Mode save (ends Day 48 as of 0.9.0).',
  },
  {
    id: 'random-events',
    label: 'Random Events',
    description: 'The sky turns red... Ungated events that can strike at almost any moment.',
  },
  {
    id: 'signal-events',
    label: 'Signal Events',
    description: 'Take me home. Triggered by downloading, playing, or processing specific signals.',
  },
  {
    id: 'dreams',
    label: 'Dreams',
    description: 'No sleep. Minigame nightmares while Kel sleeps — or when something grabs him.',
  },
  {
    id: 'ariral-reputation',
    label: 'Ariral Reputation',
    description: "Who's here with me? Story-mode pranks and gifts from the visiting Arirals — tier depends on reputation.",
  },
  {
    id: 'player-activated',
    label: 'Player-Activated',
    description: "Death Won't Stop Work. Consequences you trigger yourself — often by accident.",
  },
  {
    id: 'endings',
    label: 'Endings',
    description: '...the end is near... Game-over scenarios. Reload returns you to your last save.',
  },
  {
    id: 'console-commands',
    label: 'Console Commands',
    description: 'Secret base-console commands that spawn jokes, minigames, or chaos.',
  },
];

const hint = (code, category, steps) => ({ id: code, category, code_name: code.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), steps });

const newEvents = [
  // —— Story Mode ——
  hint('meteor-shower', 'story-mode', ['Peer into the sky, doctor.', 'Story Mode Day 2, shortly after midnight.', 'A meteor shower fills the night sky for about two real minutes (sped up while sleeping).']),
  hint('power-outage', 'story-mode', ['These shitty breakers must be flipping themselves.', 'Story Mode Day 4, shortly after midnight.', 'All basement breakers flip off at once — flip them back. Extra fireflies may appear around base.']),
  hint('vent-crawler', 'story-mode', ['Just an animal, right?', 'Story Mode Day 5, late evening — stand at the Main Computer.', 'Meta Paranoia until you face the main PC. Something crawls over the vent grate and knocks it loose; you can climb into the vents afterward.']),
  hint('ariral-peace-signal', 'story-mode', ['No way!', 'Story Mode Day 6, late evening — ping a new signal.', 'Your next ping is guaranteed to be the peace signal (single warp arrow). Process to L3 for garbled "We come in peace." Unique — save it when found.']),
  hint('ariral-picnic', 'story-mode', ['This can\'t be real.', 'Story Mode Day 8, shortly after midnight.', 'Two warp arrows and a picnic appear in the valley between Sierra and Romeo. Ships cloak when approached; invisible Ariral may run past. Sierra & Romeo servers die one hour later.']),
  hint('no-more-birds', 'story-mode', ['It\'s so quiet...', 'Story Mode Day 9 onward (also other modes on schedule).', 'Forest birds flee permanently — ambience singing stops. Not Story-only.']),
  hint('wormhole-signal', 'story-mode', ['Is that a dyson sphere?', 'Story Mode Day 9, evening — ping a new signal.', 'Next ping guaranteed wh signal — hollow construct around a black hole. L3 audio is mechanical drone + Caretaker excerpt. Third-largest signal in the game.']),
  hint('arirals-talk-signal', 'story-mode', ['There\'s two of them?!', 'Story Mode Day 11, midnight — ping a new signal.', 'Next ping guaranteed arirstalk — two warp arrows. L3 is garbled Ariral conversation. Unique.']),
  hint('arirals-eating-shrimp', 'story-mode', ['Who\'s here with me?!', 'Story Mode Day 12 onward (all modes Day 12).', 'Visitors eat any shrimp packs left outside containers when you\'re not looking. Only Loyal reputation stops all three.']),
  hint('vent-knocker', 'story-mode', ['Who\'s there?!', 'Story Mode Day 12, shortly after midnight — stand at Main Computer.', 'Meta Paranoia until you face the PC. Loud banging in vents above the server room, then stops.']),
  hint('ariral-cringe-comp-signal', 'story-mode', ['Such an idiot.', 'Story Mode Day 12, late evening — ping a new signal.', 'Object signal of two warp arrows. L3 shows the signal room from outside the window with alien caption text.']),
  hint('email-spam-ariral-visit', 'story-mode', ['Something wants you to look outside.', 'Story Mode Day 13, midnight — stand at Main Computer.', 'Spam emails spell OUTSIDE. Warp arrow visible from signal room; approaches teleport it away. Photo = +15 rep. Leaves ~06:49 if ignored inside.']),
  hint('pink-wisp-swarm', 'story-mode', ['They have me surrounded...', 'Story Mode Day 14, evening — look away from radar.', 'Many pink wisps spawn across the array.']),
  hint('sushi-gift-delivery', 'story-mode', ['My favorite!', 'Story Mode Day 15, morning.', 'Unordered sushi appears via delivery drone with note from Ena and Max.']),
  hint('flickering-lantern-prank', 'story-mode', ['A prank near the Hole.', 'Story Mode Day 15, late afternoon.', 'Radar pings at Hole buildings; flickering lantern upstairs with notepad. Touching notepad → Ariral beats door. Shrimp pack blocks attack. Lantern can be kept (permanent flicker, huge fuel).']),
  hint('ariral-treehouse', 'story-mode', ['New neighbors.', 'Story Mode Days 17–22, built overnight near TR1.', 'Arirals build a treehouse over five days. Victor server baits you on Days 17 and 20. See Ariral Reputation for interactions.']),
  hint('anti-gravity-prank', 'story-mode', ['Jerks.', 'Story Mode Day 17 — Physics Events on — stand near base ~01:01.', 'Random transformer dies; cloaked warp arrow floats above base. Objects float up ~2 in-game hours. Photo = +15 rep first time only.']),
  hint('croissant-delivery', 'story-mode', ['Genuine French cuisine.', 'Story Mode Day 20, morning.', 'Drone delivers 5 croissants with note from Ena.']),
  hint('radio-tower-ariral-ship', 'story-mode', ['A visitor at the tower.', 'Story Mode Day 20+ — random chance atop Radio Tower.', 'Ariral ship appears beside tower briefly. Meta Paranoia until it leaves. No rep from photos here.']),
  hint('dropped-ariral-gun', 'story-mode', ['Something fell in the parking lot.', 'Story Mode Day 24, ~02:04 — enter garage.', 'Yowl outside, then special gun + shrimp in parking lot. Return to treehouse for rep or Ariral retrieves it.']),
  hint('brownie-trail', 'story-mode', ['Ooh, piece of candy.', 'Story Mode Day 25, dawn — enter garage.', 'Ariral lays brownie trail to treehouse; notes and Kel doll depend on reputation. May trash base while you\'re away.']),
  hint('warning-obelisk', 'story-mode', ['I\'ve got a bad feeling about this...', 'Story Mode Day 25, afternoon — near Signal Lab windows.', 'Obelisk falls at coords ~80/1.75 — alarms, objects flung. Approach for hologram warning. Trampoline at landing (Funny) = achievement.']),
  hint('ariral-satellite-signals', 'story-mode', ['Three\'s a pattern.', 'Story Mode Day 26, late morning — ping new signals.', 'Three similar Ariral satellite signals that day — download all three to resume normal pings.']),
  hint('black-hole-sun', 'story-mode', ['Won\'t you come?', 'Story Mode Day 27, late morning.', '~1 minute of black sky, red ambient light, sun replaced by black hole. Emails from Dr. Bao + garbled user message. Meta Paranoia throughout.']),
  hint('looker-signals', 'story-mode', ['Signals that watch back.', 'Story Mode Day 28, evening — ping new signals.', 'Series of live-feed signals closing in on you. Fourth is inside a locker — warning not to look inside. Fifth auto-downloads behind your head.']),
  hint('piramid-signal', 'story-mode', ['Something pyramid-shaped in space.', 'Story Mode Day 30, evening — ping a new signal.', 'Signal shows pyramid object in space. Playing/processing not required for arrival event.']),
  hint('piramid-arrival', 'story-mode', ['A giant walks the array.', 'Story Mode Day 31, evening — stand in Signal Lab.', 'Huge Rozital collects all yellow wisps then leaves. Meta Paranoia during roar. Yellow wisps stop spawning (save/reload if bugged).']),
  hint('rozital-scouts', 'story-mode', ['Tentacles at TR3.', 'Story Mode Day 33, evening.', 'TR3 shuts off; tentacled Rozitals tour the array. Avoid scan too long → they kill you. Successful scan → peaceful exit near Victor. Attacks Kerfur-Omegas.']),
  hint('garage-soltomia', 'story-mode', ['A sponge in the garage.', 'Story Mode Day 35, evening — while inside base.', 'Soltomia Rozital enters via drone hole, cleans ATV. Doors jam until you open garage — Rozital flees, drops giant sponge.']),
  hint('peeping-ufo', 'story-mode', ['Peek-a-boo!', 'Story Mode Day 37, morning — stand at Main Computer.', 'UFO hovers near garage until you physically spot it. Cameras don\'t scare it off.']),
  hint('rozital-mothership', 'story-mode', ['Something enormous overhead.', 'Story Mode Day 38, late morning.', 'Massive rectangular Rozital ship slowly crosses the array — ~8 real minutes.']),
  hint('hole-repair', 'story-mode', ['Purple beams at the Hole.', 'Story Mode Day 39, midnight — stand at Main Computer.', 'Rozitals repair the Hole; laser vaporizes props and player. Stand in fenced area 3s for neutral Kavotia. Capsule in pit — Yoink achievement. Resolves after 2 days if ignored.']),
  hint('gray-drops-corpse', 'story-mode', ['Flying saucers overhead.', 'Story Mode Day 40, late evening — Main Computer.', 'Saucers drop edible corpse near power block. Omegas disabled; lights flicker.']),
  hint('gray-drops-corpse-window', 'story-mode', ['Another drop, different spot.', 'Story Mode Day 41, pre-dawn — Main Computer.', 'Same saucer flyover but corpse lands in parking lot.']),
  hint('gray-drops-jeep', 'story-mode', ['They dropped a vehicle.', 'Story Mode Day 42, late evening — Main Computer.', 'Saucers drop a jeep near base. Hacksaw → 22 metal scrap.']),
  hint('grays-at-transformer', 'story-mode', ['Two figures on the hill.', 'Story Mode Day 43, late afternoon.', 'TR3 forced off; restore power → two Grays walk downhill. Too close = ragdoll + they vanish. Follow at distance ~2 minutes.']),
  hint('gray-firetank', 'story-mode', ['A box from the sky.', 'Story Mode Day 44, evening.', 'TR1 off; saucers drop flamethrower tank that chases you (or a boar without Extreme Combat).']),
  hint('gray-invasion', 'story-mode', ['War at the treehouse.', 'Story Mode Day 47, 03:00.', '90 minutes of boars and firetanks spawn on treehouse — Arirals defend. Missing returned gun = one Ariral unarmed.']),

  // —— Random (Bad Sun omitted — covered under Real-Life Time) ——
  hint('ariral-troll-drive', 'random-events', ['A suspicious drive delivery.', 'Extremely rare when drone delivers or you insert a drive in playback.', 'Drive named like Ariral porno bait; contains L0 funny signal dated 2024.05.11.']),
  hint('black-fog', 'random-events', ['In my restless dreams...', 'Random chance.', 'Brown-noise drone, opaque black fog, Prying Eyes roam. Mid-event → Meta Paranoia. Lasts ~2.5 in-game hours.']),
  hint('cursed-church', 'random-events', ['Church bells from nowhere.', 'Random chance.', 'Derelict church spawns randomly; bells heard map-wide. Barricaded — clipping inside crashes game.']),
  hint('the-dialogue', 'random-events', ['Chat notifications from nowhere.', 'Random chance.', 'Fake multiplayer chat about secrets — message cuts off mid-word.']),
  hint('earth-shaking-roar', 'random-events', ['Something roars.', 'Random chance.', 'Unknown entity roar shakes the area.']),
  hint('empty-base', 'random-events', ['Where did everything go?', 'Random chance while inside base perimeter.', 'Teleported to unfurnished base floating in void ~1 minute or until you fall — respawn at Security Booth.']),
  hint('eye-moon', 'random-events', ['Keep looking up.', 'Random chance.', 'Moon replaced by an eye for one night.']),
  hint('fossilhound-vs-boar-war', 'random-events', ['A battle at the array.', 'Random night in signal room after Story Day 42.', '30+ Gray boars vs Fossilhounds circle base and fight each other — never despawn.']),
  hint('gears', 'random-events', ['Massive gears while you sleep.', 'Pre-0.7.0: random on sleep to 100% stamina.', 'Huge gears across array until you step outside. Vintage Story reference (creator hadn\'t played it).']),
  hint('geom-ovoid-roaming', 'random-events', ['Living geometry at night.', 'Random chance at night.', 'Geom Ovoid descends and roams; approaches make it ascend.']),
  hint('goat-skull-locker-jumpscare', 'random-events', ['Check the locker.', 'Random chance opening any locker.', 'Large goat skull inside — sound and quick fade.']),
  hint('gore-locker', 'random-events', ['Something in the meat locker?', 'Random chance.', 'Random base locker fills with flesh gibs and body parts; gibs may persist.']),
  hint('gray-cloaking-panel', 'random-events', ['The sky is falling!', 'Random chance at night.', 'Strobing sky light intensifies until cloaking panel crashes into you — achievement. Panel can be carried; Use captures background image.']),
  hint('kerfur-omega-scary-face', 'random-events', ['COME A LITTLE CLOSER', 'Random chance when not looking at Kerfur-Omega.', 'Glance at Omega → scary face flash for a split second.']),
  hint('lake-event', 'random-events', ['The lake glows green.', 'Random chance.', 'Lake Mouth opens green beam — too close pulls you in and kills you.']),
  hint('light-switches-off', 'random-events', ['Did I leave that on?', 'Random chance.', 'A light switch flips itself off.']),
  hint('mannequins-at-uniform', 'random-events', ['Gathering at Uniform.', 'Random chance.', 'All mannequins teleport in front of Uniform — one may float (radio tower hook victim).']),
  hint('meat-locker-thief', 'random-events', ['A hook went missing.', 'Random chance.', 'Meat hook vanishes — gore and blood on locker floor with crunch sound.']),
  hint('meat-locker-thumper', 'random-events', ['Who\'s there?', 'Random chance in Basement, worse when not watching locker.', 'Shadow entity thumps meat locker door; stops if you look. Once per occurrence.']),
  hint('meat-rain', 'random-events', ['IT\'S RAINING FLESH', 'Random chance.', 'Roar then meat piles rain around you — clean up manually.']),
  hint('possessed-kerfur', 'random-events', ['Your Kerfur just walked off.', 'Random chance while standard Kerfur is powered off.', 'Kerfur bolts to meat pile 200m out (~66.6% charge). 25% chance → Abandoned Kerfur burial instead.']),
  hint('press-shift-to-run', 'random-events', ['A helpful tutorial tip.', 'Random chance — even on title screen.', 'Popup tells you to press your Run key to sprint.']),
  hint('red-phone-rings', 'random-events', ['Hello..?', 'Random chance.', 'Red phone on download panel rings until you approach — can\'t answer. Meta Paranoia; works away from base.']),
  hint('red-sky', 'random-events', ['The sky turns red.', 'Random chance.', 'Harsh red sky all day — sun/moon/stars still visible, lighting unchanged.']),
  hint('rubber-duck', 'random-events', ['Quack.', 'Random chance.', 'Rubber duck spawns with quack — despawns unless stored in inventory/container.']),
  hint('salt-heart', 'random-events', ['A heart in salt.', 'Random chance.', 'Salt pile with human heart near Hole lodgings — real-world unsolved incident reference.']),
  hint('satellites-move-on-own', 'random-events', ['The dishes are moving.', 'Random chance.', 'All satellites rotate together same direction — resets polarity if tracking; no Meta Paranoia.']),
  hint('shooting-star', 'random-events', ['Make a wish.', 'Random chance.', 'Single shooting star — same as Story meteor shower stars.']),
  hint('skerfuro-random', 'random-events', ['Where did Omega go?', 'Random chance with active Kerfur-Omega.', 'Omega stolen → flesh room on camera; Skerfuro at a random window. Check every window to end Meta Paranoia.']),
  hint('sky-ufo', 'random-events', ['Barely visible in the distance.', 'Random chance — any gamemode.', 'Far Gray UFO drifts by. Looking that way triggers Meta Paranoia (can interrupt sleep cam).']),
  hint('sky-jellyfish-event', 'random-events', ['Pink shapes overhead.', 'Random chance at night.', 'Sky Jellyfish cross the map corner to corner — radar blips, no collision.']),
  hint('stolen-radio-tower', 'random-events', ['The tower is gone.', 'Random chance while not looking at radio tower.', 'Entire radio tower vanishes — real stolen-tower news reference.']),
  hint('super-fog', 'random-events', ['In my restless dreams...', 'Random chance.', 'Thick forest fog + Meta Paranoia + one Thunder Wisp until event ends.']),
  hint('toyota-corolla', 'random-events', ['Insurance information time.', 'Random chance approaching any transformer.', 'Car rolls down slope with censored branding — troll faces under censors. Inert, vanishes later. GTA SA ghost car reference.']),
  hint('tree-debris', 'random-events', ['Something fell from the tree.', 'Random chance near trees/wood structures.', 'Drops stick, pinecone, light tube, explosive red tube, etc.']),

  // —— Signal Events ——
  hint('kerfur-sleep-scare', 'signal-events', ['Don\'t sleep on Omega.', 'Save signal ker, then sleep with Kerfur-Omega active.', 'Omega runs scary face at sleep cam → ragdoll wake. Waking early still ends in ragdoll.']),
  hint('magnet-skeleton', 'signal-events', ['A body by TR1.', 'Save signal process.', 'Bloody skeleton + blood splatter + Alien Magnet outside TR1. Not edible. One-time per save.']),
  hint('pink-beam-rozital-engine', 'signal-events', ['Pink floods the sky...', 'Process lifecrystal to Level 3.', 'At night, purple beam strikes near Uniform ~30s — Rozital engine awakens, sparks, explodes. Leaves magenta Argemia plush.']),
  hint('shitting-duende-signal', 'signal-events', ['How about some privacy!?', 'Funny Rule on — random scan chance; save shitDuende.', 'Duende on your toilet; spotted directly → vanishes.']),
  hint('shorts-ariral-teleport', 'signal-events', ['A crash at the map edge.', 'After Day 30 — random scan for shortarirtp.', 'Massive crash, blue flash, power out, permanent radar dot between Yankee and Romeo — severed legs + Gravity Gun in wreckage.']),
  hint('tardis-event', 'signal-events', ['A familiar blue box.', 'Save signal tardis.', 'TARDIS appears in front parking lot ~5–10 in-game minutes; event ~2 real minutes total.']),
  hint('trifo-event', 'signal-events', ['Where is my golf cart?!', 'Save signal trifo.', 'Lights flicker; triangle UFO hovers base — blur + zoom effect. Basement breakers may flip.']),
  hint('virus-event', 'signal-events', ['CRITICAL ERROR!', 'Save signal virus.', 'All PCs show Petya-style skull screen; power down briefly; many servers need repair.']),
  hint('zombie-deer-event', 'signal-events', ['Yummers.', 'Process deer signal to Level 3.', 'Rotting deer on sidewalk; ghost deer stalks each night until corpse gone.']),
  hint('the-evil-event', 'signal-events', ['The worst ending.', 'Process evil to Level 3.', 'Limited time to destroy ALL copies everywhere or game over. Ariral email warns you. Selling via drone counts as destroyed. Success = +50 rep.']),
  hint('skeleon-appears', 'signal-events', ['HAPY HALOWEENER !1', 'Pre-0.8.1 Halloween mode — 13 jack-o-lanterns then play skeleton signal.', 'Game freezes; skull zooms on console with Halloween gifs.']),

  // —— Dreams ——
  hint('dream-base', 'dreams', ['A warped version of home.', 'Day 22+ random sleep chance.', 'Distorted Alpha Root break room — moans in background. Ends after 2 minutes or falling in void.']),
  hint('dream-boulder', 'dreams', ['Dodge the rocks.', 'Random sleep.', 'Steep slope with rolling boulders — survive 60s to win (hunger/stamina boost).']),
  hint('dream-burger', 'dreams', ['Collect the glowing burgers.', 'Random sleep.', 'Burger platform — grab 10 burgers in 2 minutes without falling. Achievement on win.']),
  hint('dream-climbing', 'dreams', ['Rising water below.', 'Random sleep.', 'Climb pillars and beams to the door before water reaches you.']),
  hint('dream-flooding', 'dreams', ['Find the exit.', 'Random sleep.', 'Massive room, rising water — find hidden door in 60s to win.']),
  hint('dream-furfur', 'dreams', ['Four watchers.', 'After encountering Furfur — guaranteed next dream.', 'Circular platform; four Furfurs rise around you for 6 seconds. Force Furfur via deer skull ritual.']),
  hint('dream-hallway', 'dreams', ['Water from behind.', 'Random sleep.', 'Cramped hallway — reach exit before water catches you.']),
  hint('dream-mannequin', 'dreams', ['Don\'t touch them.', 'Random sleep.', 'Shadow mannequins in side rooms — avoid contact 2 minutes. Achievement on win.']),
  hint('dream-parkour', 'dreams', ['Pillars over the void.', 'Random sleep.', 'Reach corner exit door in 2 minutes without falling in water.']),
  hint('dream-shed', 'dreams', ['Wait outside the shed.', 'Random sleep (?)', 'Wooden shed on plain — UFO abducts after a few seconds outside.']),
  hint('dream-work', 'dreams', ['The walls close in.', 'Random sleep.', 'Room with table — walls crush everything after 1 minute. Clip through walls to end early.']),

  // —— Player-Activated ——
  hint('howling-grass', 'player-activated', ['What was that?!', 'Step on grass at X:-318 / Y:-122 — not Ambience mode.', 'Ghostly howl in distance. Resets on reload.']),
  hint('howling-hoofprints', 'player-activated', ['I\'m hearing things...', 'Walk over hoofprints in Abandoned Shack.', 'Howl outside shack — Half-Life 2 Ravenholm sound. Does not reset on save.']),
  hint('invalid-email', 'player-activated', ['A blank reply from HQ.', 'Random chance mailing a full drive box.', 'Blank email from ASO employee — corrupted transmission feature.']),
  hint('meat-locker-knocker', 'player-activated', ['Why is the curtain in the air?', 'Block meat locker door, then break line of sight to window.', 'Knocking escalates until obstruction clears; pauses if you look.']),
  hint('mystery-footprints', 'player-activated', ['Was it real?', 'Interact with hidden vent note under MREs in Alpha Root.', 'Footprints spawn by front camera pole until next load; repeatable via note.']),
  hint('restocker', 'player-activated', ['Thank you..?', 'Buy out a vending machine then leave its sight.', 'Black figure refills machine — brief glimpse + flickering lights.']),
  hint('skeleton-in-chair', 'player-activated', ['Death won\'t stop work.', 'Walk over X:121.50 / Y:-246.75.', 'Full skeleton in swivel chair until disturbed — gone on reload.']),
  hint('gay-baby-jail', 'player-activated', ['Space-time continuum abuse.', 'Debug TP 10× fast OR clip through world with Paper Sheet.', 'Teleported to prison cell — wait 2 real minutes. Pause menu locked. Erie plush on toilet next door.']),
  hint('i-know-what-you-are', 'player-activated', ['Who told you?!', 'Open title/pause menu when Patreon list unavailable (e.g. offline).', 'Low-quality "i know what you are" meme top-left.']),

  // —— Ariral Reputation ——
  hint('rep-alien-cart', 'ariral-reputation', ['A cart rolls down the hill.', 'Random reputation event — stand at computer table.', 'Wooden cart with paper alien rolls outside fence. Meta Paranoia until triggered at PC.']),
  hint('rep-alien-catapult', 'ariral-reputation', ['Something in the garage.', 'Reputation event at computer table.', 'Gray alien sound → paper alien launched from catapult in garage. Harmless.']),
  hint('rep-atv-explodes', 'ariral-reputation', ['Your ride may be rigged.', 'Random reputation event (mean tiers).', 'ATV set to 0 health and explodes when you try to drive.']),
  hint('rep-atv-joyride', 'ariral-reputation', ['They borrowed the ATV.', 'Random reputation event.', 'Arirals joyride ATV into river with 314 fuel.']),
  hint('rep-atv-refill', 'ariral-reputation', ['Free gas.', 'Random reputation event (good tiers).', 'Ariral fills ATV to 200 fuel (double cap) — drops gas can with 100 fuel.']),
  hint('rep-atv-repair', 'ariral-reputation', ['Free repairs.', 'Random reputation event (good tiers).', 'Ariral repairs ATV to 200 health — drops toolbox and flees.']),
  hint('rep-base-graffiti', 'ariral-reputation', ['Chalk art on the base.', 'Random reputation event.', 'Black chalk graffiti — void-eyed Ariral among possible images.']),
  hint('rep-base-graffiti-random', 'ariral-reputation', ['More chalk surprises.', 'Random reputation event.', 'Random graffiti: shrimp burger, Ariral in bush, eating mushroom, etc.']),
  hint('rep-base-reorganizing', 'ariral-reputation', ['Someone rearranged your stuff.', 'Random reputation event.', 'Arirals reorganize furniture and props in base.']),
  hint('rep-bed-relocation', 'ariral-reputation', ['Wake up somewhere else.', 'Reputation event while sleeping.', 'Wake at X:-601.6 / Y:-367.0 near CR3 — mattress may vanish.']),
  hint('rep-bed-shrimp', 'ariral-reputation', ['Shrimp on your bed.', 'Random while sleeping.', 'Blue raw shrimp left on bed/sleeping bag (balcony if bag). Repeats.']),
  hint('rep-bedroom-vent-break-in', 'ariral-reputation', ['Kick from the vent.', 'Reputation event in Bedroom.', 'Ariral kicks opposite vent and retreats.']),
  hint('rep-blue-lights-prank', 'ariral-reputation', ['Blue glow everywhere.', 'Random reputation event.', 'Power off; blue light tubes in vents, basement, garage roof, second floor — radar entities.']),
  hint('rep-bomb-present', 'ariral-reputation', ['A box at the door.', 'Random mean-tier event.', 'Cardboard box labelled Open at front door — explodes if opened.']),
  hint('rep-console-breach', 'ariral-reputation', ['Remote hack attempt.', 'Random reputation event.', 'Console spam about reactor/core — fails. Meta Paranoia during.']),
  hint('rep-cookies-present', 'ariral-reputation', ['Open me.', 'Random good-tier event.', 'Box at front door with 48 cookies inside.']),
  hint('rep-door-trash-piles', 'ariral-reputation', ['Trash at every door.', 'Random reputation event.', 'Trash clumps at front door and garage inner door.']),
  hint('rep-drives-gift', 'ariral-reputation', ['Free drives.', 'Random reputation event.', '4 empty drives thrown near base — safe to use.']),
  hint('rep-egg-ditch', 'ariral-reputation', ['Knock at the door.', 'Random reputation event.', 'Knocking → large egg on doorstep.']),
  hint('rep-fake-drives', 'ariral-reputation', ['Don\'t trust these drives.', 'Random reputation event.', '4–5 drives thrown around base — explode on any file operation.']),
  hint('rep-food-gift', 'ariral-reputation', ['Food from above.', 'Random reputation event.', '5–6 food items thrown into signal room, garage hole, or balcony.']),
  hint('rep-food-gift-outside', 'ariral-reputation', ['A snack nearby.', 'Random when low on food.', 'Ariral leaves food + light tube near you.']),
  hint('rep-gas-can-prank', 'ariral-reputation', ['Burning cans around base.', 'Random mean-tier event.', 'Lit gas cans placed around base.']),
  hint('rep-goblin-cutouts', 'ariral-reputation', ['Goblins at Uniform.', 'Reputation event — Uniform server interaction.', 'Uniform goes down; footsteps on stairs; two Hopskinville Goblin cutouts left outside server room.']),
  hint('rep-medkit-gift', 'ariral-reputation', ['GET WELL.', 'Random when health low.', 'Medkit on bed with note GET WELL.']),
  hint('rep-noise-maker', 'ariral-reputation', ['Gray alien noises.', 'Random reputation event.', 'Ariral walks around making alien sounds. Meta Paranoia.']),
  hint('rep-oilslicks', 'ariral-reputation', ['Slippery entrance.', 'Random reputation event.', 'Oil slicks at front door, garage, balcony — slip and fall.']),
  hint('rep-poisoned-food', 'ariral-reputation', ['Don\'t eat that.', 'Random reputation event.', 'Poisoned shrimp packs, burgers, MREs, etc. left around.']),
  hint('rep-reactor-restart', 'ariral-reputation', ['Check the tower breakers.', 'Random reputation event.', 'Email from Dr. Bao; front door broken; 3 alien mannequins at garage; radio tower disconnected temporarily.']),
  hint('rep-sleep-feeding', 'ariral-reputation', ['Spoon-fed while asleep.', 'Sleep with hunger below 50.', 'Ariral feeds you unknown substance until full — leaves container + spoon. Repeats.']),
  hint('rep-tacks', 'ariral-reputation', ['Watch your step.', 'Random mean-tier event.', 'Tacks in parking lot, paths, and Signal Lab floor — damage and ragdoll.']),
  hint('rep-throwing-rocks', 'ariral-reputation', ['Rocks at the window.', 'Reputation event at computer table.', 'Arirals throw rocks at center window; resume if you return to PC after chasing them out.']),
  hint('rep-treehouse-kidnapping', 'ariral-reputation', ['Wake up at the treehouse.', 'Reputation event while sleeping.', 'Spawn at Ariral Treehouse — can happen before it\'s built.']),
  hint('rep-vaccine', 'ariral-reputation', ['Body improvement.', 'Random reputation event.', 'Arirals give vaccine with note: USE IMPROVE BODY BETTER FUTURE ME PROMISE USE.']),
  hint('rep-vent-assault', 'ariral-reputation', ['Drop from the vents.', 'Reputation event in Signal Processing room.', 'Ariral crawls vents, drops in, won\'t leave until they hit you. Vent stays open.']),

  // —— Endings ——
  hint('ending-the-evil', 'endings', ['The worst ending.', 'Process evil to L3, fail to delete all copies within 12 real minutes.', 'World consumed — black/red flash then GAME OVER. Save not deleted.']),
  hint('ending-bad-sun', 'endings', ['You have seen everything.', 'Die from sunlight during Bad Sun event.', 'Liquefied — unique game over. Also unlocks achievement. See Real-Life Time for surviving the event.']),
  hint('ending-rufus-removed', 'endings', ['Skill issue.', 'Removed: caught by Rufus or Thiccfus before Demo 0.6.2.', 'Meme game over screen. Use console Rufus in modern versions instead.']),

  // —— Console Commands ——
  hint('cmd-alien', 'console-commands', ['err; try again', 'Type alien or summon_alien in base console.', 'Spawns wooden alien cutout(s) behind random door(s) in base or at satellites.']),
  hint('cmd-argemwell', 'console-commands', ['La Creatura activated.', 'Type argemwell in console.', 'Argemwell spawns randomly — pet too much → shrimp explosion that can crash the game.']),
  hint('cmd-bingus', 'console-commands', ['ASCII cat.', 'Type bingus in console.', 'ASCII Bingus appears on screen.']),
  hint('cmd-eriewell', 'console-commands', ['She activated.', 'Type eriewell in console.', 'Eriewell spawns — pet too much → cheese explosion; slam → unique gore pile reforms.']),
  hint('cmd-gnarpwell', 'console-commands', ['The Ugly activated.', 'Type gnarpwell in console.', 'Gnarpwell spawns singing — pet too much → explode; slam → metal trash pile.']),
  hint('cmd-gooseworx-rufus', 'console-commands', ['HIDE.', 'Type gooseworx.rufus with Funny enabled.', 'Rufus chases with eerie music and red HIDE text. Kill with explosives or rufus.fuckoff for achievement + plush.']),
  hint('cmd-gooseworx-thiccfus', 'console-commands', ['Rounder and slower.', 'Type gooseworx.thiccfus with Funny enabled.', 'Fat Rufus variant — same rules, slower.']),
  hint('cmd-llama-saatana', 'console-commands', ['Llama soul is out there.', 'Type llama.saatana in console.', 'Rainbow llama plush behind you in server room — jumpscare scream if approached. Repeat command gets text response.']),
  hint('cmd-madness-combat', 'console-commands', ['It is not the time.', 'Type madness.combat between 18:00–07:00 during Red Sky.', 'Kill counter + endless Grunts until Red Sky ends — score popup with personal best.']),
  hint('cmd-maxwell', 'console-commands', ['Maxwell activated.', 'Type maxwell in console.', 'Cat spawns — pet too much → skeleton explode.']),
];

// Insert categories after 3am-events (before extraterrestrials)
const timeCatIds = new Set(['real-life-time', 'in-game-time', '3am-events']);
const entityStart = data.categories.findIndex((c) => c.id === 'extraterrestrials');
const insertAt = entityStart === -1 ? data.categories.length : entityStart;
const existingIds = new Set(data.categories.map((c) => c.id));
const catsToAdd = newCategories.filter((c) => !existingIds.has(c.id));
data.categories.splice(insertAt, 0, ...catsToAdd);

const existingEventIds = new Set((data.events || []).map((e) => e.id));
const eventsToAdd = newEvents.filter((e) => !existingEventIds.has(e.id));
data.events = [...(data.events || []), ...eventsToAdd];

data.meta.subtitle =
  'Spoiler-free guide for VoTV events and entities. Time-related, story, random, signals, dreams, reputation, and more — slide each hint open to peek.';
data.meta.sourceEvents = 'https://voicesofthevoid.wiki.gg/wiki/Events';

const newJson = JSON.stringify(data, null, 2);
const newHtml = html.replace(
  /<script id="event-data" type="application\/json">\s*[\s\S]*?\s*<\/script>/,
  `<script id="event-data" type="application/json">\n${newJson}\n  </script>`
);
writeFileSync(htmlPath, newHtml);
console.log(`Added ${catsToAdd.length} categories, ${eventsToAdd.length} events.`);
