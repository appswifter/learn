# 图灵机(Turing Machine, TM), 能访问一条无限长纸带的有限状态自动机
# 这个名字通常指一条拥有确定性规则的机器, 也叫确定型图灵机(Deterministic Turing Machine, DTM)

class Tape < Struct.new(:left, :middle, :right, :blank)
  def inspect
    "#<Tape #{left.join}(#{middle})#{right.join}>"
  end

  def write(character)
    Tape.new(left, character, right, blank)
  end

  def move_head_left
    Tape.new(left[0..-2], left.last || blank, [middle] + right, blank)
  end

  def move_head_right
    Tape.new(left + [middle], right.first || blank, right.drop(1), blank)
  end
end

class TMConfiguration < Struct.new(:state, :tape) 

end

class TMRule < Struct.new(:state, :character, :next_state, :write_character, :direction)

  def applies_to?(configuration)
    state == configuration.state && character == configuration.tape.middle
  end 

  def follow(configuration)
    TMConfiguration.new(next_state, next_tape(configuration))
  end

  def next_tape(configuration)
    written_tape = configuration.tape.write(write_character)
    case direction
    when :left 
      written_tape.move_head_left
    when :right
      written_tape.move_head_right
    end
  end
end

class DTMRulebook < Struct.new(:rules) 
  def next_configuration(configuration)
    rule_for(configuration).follow(configuration)
  end

  def rule_for(configuration)
    rules.detect { |rule| rule.applies_to?(configuration) }
  end

  def applies_to?(configuration)
    !rule_for(configuration).nil?
  end
end

class DTM < Struct.new(:current_configuration, :accept_states, :rulebook)
  def accepting?
    accept_states.include?(current_configuration.state)
  end

  def stuck? 
    !accepting? && !rulebook.applies_to?(current_configuration)
  end

  def step 
    self.current_configuration = rulebook.next_configuration(current_configuration)
  end

  def run 
    step until accepting? || stuck?
  end
end

tape = Tape.new(['1', '0', '1'], '1', [], '_')

tape
tape.move_head_left
tape.write('0')

rule = TMRule.new(1, '0', 2, '1', :right)

rule.applies_to?(TMConfiguration.new(1, Tape.new([], '0', [], '_')))

# “递增二进制数”的图灵机
rulebook = DTMRulebook.new([
  TMRule.new(1, '0', 2, '1', :right),
  TMRule.new(1, '1', 1, '0', :left),
  TMRule.new(1, '_', 2, '1', :right),
  TMRule.new(2, '0', 2, '0', :right),
  TMRule.new(2, '1', 2, '1', :right),
  TMRule.new(2, '_', 3, '_', :left),
])

configuration = TMConfiguration.new(1, tape)

configuration = rulebook.next_configuration(configuration)
configuration = rulebook.next_configuration(configuration)
configuration = rulebook.next_configuration(configuration)

dtm = DTM.new(TMConfiguration.new(1, tape), [3], rulebook)
dtm.current_configuration

dtm.accepting?

dtm.step

dtm.run

dtm.current_configuration


tape = Tape.new(['1', '2', '1'], '1', [], '_')
dtm = DTM.new(TMConfiguration.new(1, tape), [3], rulebook)
dtm.run
dtm.accepting?
dtm.stuck?

# 识别 'aaabbbccc' 这样的字符串的图灵机
rulebook = DTMRulebook.new([ 
  # 状态 1：向右扫描，查找 a T
  TMRule.new(1, 'X', 1, 'X', :right), # 跳过 X 
  TMRule.new(1, 'a', 2, 'X', :right), # 删除 a，进入状态 2
  TMRule.new(1, '_', 6, '_', :left), # 查找空格，进入状态 6（接受）

  # 状态 2：向右扫描，查找 b 
  TMRule.new(2, 'a', 2, 'a', :right), # 跳过 a 
  TMRule.new(2, 'X', 2, 'X', :right), # 跳过 X 
  TMRule.new(2, 'b', 3, 'X', :right), # 删除 b，进入状态 3

  # 状态 3：向右扫描，查找 c 
  TMRule.new(3, 'b', 3, 'b', :right), # 跳过 b 
  TMRule.new(3, 'X', 3, 'X', :right), # 跳过 X 
  TMRule.new(3, 'c', 4, 'X', :right), # 删除 c，进入状态 4

  # 状态 4：向右扫描，查找字符串结束标记 
  TMRule.new(4, 'c', 4, 'c', :right), # 跳过 c 
  TMRule.new(4, '_', 5, '_', :left), # 查找空格，进入状态 5

  # 状态 5：向左扫描，查找字符串开始标记 
  TMRule.new(5, 'a', 5, 'a', :left), # 跳过 a 
  TMRule.new(5, 'b', 5, 'b', :left), # 跳过 b 
  TMRule.new(5, 'c', 5, 'c', :left), # 跳过 c 
  TMRule.new(5, 'X', 5, 'X', :left), # 跳过 X 
  TMRule.new(5, '_', 1, '_', :right) # 查找空格，进入状态 1 
])

tape = Tape.new([], 'a', ['a', 'a', 'b', 'b', 'b', 'c', 'c', 'c'], '_')
dtm = DTM.new(TMConfiguration.new(1, tape), [6], rulebook)

10.times { dtm.step }; dtm.current_configuration
25.times { dtm.step }; dtm.current_configuration
dtm.run; dtm.current_configuration


# ====> 内部存储
rulebook = DTMRulebook.new([ 
  # 状态 1：从磁带读取第一个字符 
  TMRule.new(1, 'a', 2, 'a', :right), # 记住 a 
  TMRule.new(1, 'b', 3, 'b', :right), # 记住 b 
  TMRule.new(1, 'c', 4, 'c', :right), # 记住 c
  # 状态 2：向右扫描，查找字符串结束标记（记住 a） 
  TMRule.new(2, 'a', 2, 'a', :right), # 跳过 a 
  TMRule.new(2, 'b', 2, 'b', :right), # 跳过 b 
  TMRule.new(2, 'c', 2, 'c', :right), # 跳过 c 
  TMRule.new(2, '_', 5, 'a', :right), # 找到空格，写 a 
  # 状态 3：向右扫描，查找字符串结束标记（记住 b） 
  TMRule.new(3, 'a', 3, 'a', :right), # 跳过 a 
  TMRule.new(3, 'b', 3, 'b', :right), # 跳过 b 
  TMRule.new(3, 'c', 3, 'c', :right), # 跳过 c 
  TMRule.new(3, '_', 5, 'b', :right), # 找到空格，写 b
  # 状态 4：向右扫描，查找字符串结束标记（记住 c）
  TMRule.new(4, 'a', 4, 'a', :right), # 跳过 a 
  TMRule.new(4, 'b', 4, 'b', :right), # 跳过 b 
  TMRule.new(4, 'c', 4, 'c', :right), # 跳过 c 
  TMRule.new(4, '_', 5, 'c', :right) # 查找空格，写 c 
])

# 如果用这种方式利用当前状态，我们可以设计出任凭纸带头来回移动仍能记住之前任何组 
# 合的图灵机，这实际上与给一台机器提供明确的“寄存器”作为内部存储有同样的能力， 
# 只不过代价是使用了大量的状态
tape = Tape.new([], 'a', ['c', 'b', 'c', 'a'], '_')

dtm = DTM.new(TMConfiguration.new(1, tape), [5], rulebook)

dtm.run; dtm.current_configuration.tape

# ====> 子例程

def increment_rules(start_state, return_state)
  incrementing = start_state
  finishing = Object.new
  finished = return_state

  [
    TMRule.new(incrementing, '0', finishing, '1', :right),
    TMRule.new(incrementing, '1', incrementing, '0', :left),
    TMRule.new(incrementing, '_', finishing, '1', :right),
    TMRule.new(finishing, '0', finishing, '0', :right),
    TMRule.new(finishing, '1', finishing, '1', :right),
    TMRule.new(finishing, '_', finished, '_', :left)
  ]
end

added_zero, added_one, added_two, added_three = 0, 1, 2, 3

rulebook = DTMRulebook.new(
  increment_rules(added_zero, added_one) +
  increment_rules(added_one, added_two) 
)

rulebook.rules.length

tape = Tape.new(['1', '0', '1'], '1', [], '_')

dtm = DTM.new(TMConfiguration.new(added_zero, tape), [added_two], rulebook)

dtm.run; dtm.current_configuration.tape